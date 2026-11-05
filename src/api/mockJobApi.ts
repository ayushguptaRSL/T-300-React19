import type { JobApplicationFormData } from "../schemas/jobApplicationSchema.ts";

export type ApiSimulationMode = "success" | "field_error" | "server_error";

export interface ApiSuccessResponse {
  status: "success";
  applicationId: string;
  submittedAt: string;
  candidateName: string;
  position: string;
  message: string;
}

export interface ApiFieldErrorResponse {
  status: "field_error";
  message: string;
  fieldErrors: Record<string, string>;
}

export interface ApiServerErrorResponse {
  status: "server_error";
  message: string;
  statusCode: number;
}

export type ApiResponse =
  | ApiSuccessResponse
  | ApiFieldErrorResponse
  | ApiServerErrorResponse;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock API endpoint that simulates submitting a job application.
 * 1. Success (200 OK)
 * 2. Field-level validation error (e.g., 422: duplicate email)
 * 3. Server error (500: internal server failure)
 */
export async function submitJobApplication(
  data: JobApplicationFormData,
  mode: ApiSimulationMode = "success"
): Promise<ApiResponse> {
  // Simulate network delay of 0.5 seconds
  await delay(500);

  switch (mode) {
    case "field_error":
      return {
        status: "field_error",
        message: "Server validation failed: An account with this email already exists.",
        fieldErrors: {
          "personalDetails.email": `The email '${data.personalDetails.email}' has already submitted an application within the last 6 months.`,
        },
      };

    case "server_error":
      return {
        status: "server_error",
        message: "Server Error (500): Failed to persist application record due to a temporary database failure. Please try again.",
        statusCode: 500,
      };

    case "success":
    default:
      return {
        status: "success",
        applicationId: `${Math.floor(10000000 + Math.random() * 90000000)}`,
        submittedAt: new Date().toLocaleString(),
        candidateName: data.personalDetails.fullName,
        position: data.applicationDetails.positionApplied,
        message: "Your application has been received successfully! Our talent acquisition team will review your profile.",
      };
  }
}
