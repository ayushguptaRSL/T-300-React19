import { z } from "zod";

/**
 * Calculates exact age in years from a YYYY-MM-DD date string.
 */
export const calculateAge = (dobString: string): number => {
  if (!dobString) return 0;
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is required")
    .regex(
      /^[0-9]{10}$/,
      "Please enter a valid 10-digit phone number (digits only, no '+' or country code)"
    ),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((dob) => {
      const parsed = new Date(dob);
      return !isNaN(parsed.getTime()) && parsed <= new Date();
    }, "Date of birth cannot be in the future")
    .refine(
      (dob) => calculateAge(dob) >= 18,
      "Candidate must be at least 18 years of age to apply"
    ),
  currentCity: z
    .string()
    .trim()
    .min(2, "Current city must be at least 2 characters")
    .max(80, "Current city cannot exceed 80 characters"),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
