import { z } from "zod";

export const previousCompanyItemSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, "Company name is required"),
    role: z
      .string()
      .trim()
      .min(1, "Role / Designation is required"),
    fromDate: z.string().min(1, "From date is required"),
    toDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.fromDate || !data.toDate) return true;
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      if (isNaN(from.getTime()) || isNaN(to.getTime())) return true;
      return to > from;
    },
    {
      message: "'To' date must be after 'From' date",
      path: ["toDate"],
    }
  );

export const fresherExperienceSchema = z.object({
  applicantType: z.literal("fresher"),
  availabilityToJoin: z
    .string()
    .trim()
    .min(1, "Availability to join is required"),
});

export const experiencedExperienceSchema = z.object({
  applicantType: z.literal("experienced"),
  totalExperienceYears: z
    .number({ message: "Total experience is required" })
    .refine((n) => !isNaN(n), "Total experience is required")
    .min(0.1, "Total experience must be at least 0.1 years"),
  noticePeriodDays: z
    .number({ message: "Notice period is required" })
    .refine((n) => !isNaN(n), "Notice period is required")
    .refine((n) => Number.isInteger(n), "Notice period must be a whole number of days")
    .min(0, "Notice period cannot be negative")
    .max(180, "Notice period cannot exceed 180 days"),
  previousCompanies: z
    .array(previousCompanyItemSchema)
    .min(1, "At least one previous company record is required"),
});

export const experienceSchema = z.discriminatedUnion("applicantType", [
  fresherExperienceSchema,
  experiencedExperienceSchema,
]);

export type PreviousCompanyItemData = z.infer<typeof previousCompanyItemSchema>;
export type FresherExperienceData = z.infer<typeof fresherExperienceSchema>;
export type ExperiencedExperienceData = z.infer<typeof experiencedExperienceSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
