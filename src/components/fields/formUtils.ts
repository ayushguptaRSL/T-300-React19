import type { FieldErrors, FieldError } from "react-hook-form";

/**
 * Safely traverses an RHF errors object using dot/bracket path notation.
 * e.g., "personalDetails.email" or "education.0.degree" or "experience.previousCompanies.0.toDate"
 */
export function getNestedError(
  errors: FieldErrors | undefined,
  name: string
): FieldError | undefined {
  if (!errors || !name) return undefined;

  // Split paths like "education.0.degree" or "education[0].degree"
  const parts = name.replace(/\[(\w+)\]/g, ".$1").split(".");
  let current: unknown = errors;

  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  // If current has a message property, it's a FieldError
  if (current && typeof current === "object" && "message" in current) {
    return current as FieldError;
  }

  return undefined;
}
