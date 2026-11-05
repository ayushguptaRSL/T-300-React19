import { z } from "zod";

export const applicationDetailsSchema = z.object({
  positionApplied: z
    .string()
    .trim()
    .min(1, "Position applied for is required"),
  expectedJoiningDate: z
    .string()
    .min(1, "Expected joining date is required")
    .refine((dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    }, "Expected joining date must be in the future"),
  portfolioLink: z
    .string()
    .trim()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true;
      try {
        const url = new URL(val);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    }, "Please enter a valid URL starting with http:// or https://"),
  coverNote: z
    .string()
    .max(1000, "Cover note cannot exceed 1000 characters")
    .optional(),
  acceptanceOfTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions to proceed"),
});

export type ApplicationDetailsFormData = z.infer<typeof applicationDetailsSchema>;
