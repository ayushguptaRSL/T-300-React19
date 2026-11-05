import { z } from "zod";

const currentYear = new Date().getFullYear();

export const educationItemSchema = z.object({
  degree: z
    .string()
    .trim()
    .min(1, "Degree / Qualification is required"),
  institution: z
    .string()
    .trim()
    .min(2, "Institution / University is required"),
  yearOfPassing: z
    .number({ message: "Year of passing is required" })
    .refine((n) => !isNaN(n), "Year of passing is required")
    .refine((n) => Number.isInteger(n), "Year of passing must be a valid whole year")
    .min(1960, "Year of passing must be 1960 or later")
    .max(currentYear + 6, `Year of passing cannot exceed ${currentYear + 6}`),
  percentage: z
    .number({ message: "Percentage is required" })
    .refine((n) => !isNaN(n), "Percentage is required")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot exceed 100"),
});

export const educationSchema = z
  .array(educationItemSchema)
  .min(1, "At least one education qualification is required");

export type EducationItemData = z.infer<typeof educationItemSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
