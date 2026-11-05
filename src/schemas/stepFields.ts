import type { FieldPath } from "react-hook-form";
import type { JobApplicationFormData } from "./jobApplicationSchema.ts";

export type StepNumber = 1 | 2 | 3 | 4 | 5;

export const step1Fields: FieldPath<JobApplicationFormData>[] = [
  "personalDetails.fullName",
  "personalDetails.email",
  "personalDetails.phone",
  "personalDetails.dateOfBirth",
  "personalDetails.currentCity",
];

export const getStep2EducationFields = (
  count: number
): FieldPath<JobApplicationFormData>[] => {
  const fields: FieldPath<JobApplicationFormData>[] = ["education"];
  for (let i = 0; i < count; i++) {
    fields.push(
      `education.${i}.degree` as FieldPath<JobApplicationFormData>,
      `education.${i}.institution` as FieldPath<JobApplicationFormData>,
      `education.${i}.yearOfPassing` as FieldPath<JobApplicationFormData>,
      `education.${i}.percentage` as FieldPath<JobApplicationFormData>
    );
  }
  return fields;
};

export const step3FresherFields: FieldPath<JobApplicationFormData>[] = [
  "experience.applicantType",
  "experience.availabilityToJoin",
];

export const getStep3ExperiencedFields = (
  companyCount: number
): FieldPath<JobApplicationFormData>[] => {
  const fields: FieldPath<JobApplicationFormData>[] = [
    "experience.applicantType",
    "experience.totalExperienceYears",
    "experience.noticePeriodDays",
    "experience.previousCompanies",
  ];
  for (let i = 0; i < companyCount; i++) {
    fields.push(
      `experience.previousCompanies.${i}.companyName` as FieldPath<JobApplicationFormData>,
      `experience.previousCompanies.${i}.role` as FieldPath<JobApplicationFormData>,
      `experience.previousCompanies.${i}.fromDate` as FieldPath<JobApplicationFormData>,
      `experience.previousCompanies.${i}.toDate` as FieldPath<JobApplicationFormData>
    );
  }
  return fields;
};

export const step4Fields: FieldPath<JobApplicationFormData>[] = [
  "applicationDetails.positionApplied",
  "applicationDetails.expectedJoiningDate",
  "applicationDetails.portfolioLink",
  "applicationDetails.coverNote",
  "applicationDetails.acceptanceOfTerms",
];
