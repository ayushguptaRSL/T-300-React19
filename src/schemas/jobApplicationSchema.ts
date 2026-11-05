import { z } from "zod";
import { personalDetailsSchema } from "./personalDetailsSchema.ts";
import { educationSchema } from "./educationSchema.ts";
import { experienceSchema } from "./experienceSchema.ts";
import { applicationDetailsSchema } from "./applicationDetailsSchema.ts";

/**
 * Root Job Application Form Schema.
 * Combines all multi-step schemas into a single source of truth.
 *
 * Implements cross-field validation rules:
 * 1. Personal Details: Candidate must be at least 18 years old (DOB vs current date).
 * 2. Experience: Previous company's 'To' date must be after its 'From' date.
 * 3. Application Details: Expected joining date must be strictly in the future.
 * 4. Cross-step validation: For experienced candidates, the expected joining date
 *    cannot be earlier than today + notice period days.
 */
export const jobApplicationSchema = z
  .object({
    personalDetails: personalDetailsSchema,
    education: educationSchema,
    experience: experienceSchema,
    applicationDetails: applicationDetailsSchema,
  })
  .refine(
    (data) => {
      // Cross-field rule: Notice period vs Expected Joining Date
      if (
        data.experience.applicantType === "experienced" &&
        typeof data.experience.noticePeriodDays === "number" &&
        !isNaN(data.experience.noticePeriodDays) &&
        data.applicationDetails.expectedJoiningDate
      ) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const minJoiningDate = new Date(today);
        minJoiningDate.setDate(minJoiningDate.getDate() + data.experience.noticePeriodDays);

        const joiningDate = new Date(data.applicationDetails.expectedJoiningDate);
        joiningDate.setHours(0, 0, 0, 0);

        return joiningDate >= minJoiningDate;
      }
      return true;
    },
    {
      message:
        "Expected joining date cannot be earlier than your notice period allows from today",
      path: ["applicationDetails", "expectedJoiningDate"],
    }
  );

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

export const defaultJobApplicationValues: JobApplicationFormData = {
  personalDetails: {
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    currentCity: "",
  },
  education: [
    {
      degree: "",
      institution: "",
      yearOfPassing: NaN,
      percentage: NaN,
    },
  ],
  experience: {
    applicantType: "fresher",
    availabilityToJoin: "",
  },
  applicationDetails: {
    positionApplied: "",
    expectedJoiningDate: "",
    portfolioLink: "",
    coverNote: "",
    acceptanceOfTerms: false,
  },
};
