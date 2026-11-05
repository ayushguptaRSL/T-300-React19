import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  jobApplicationSchema,
  defaultJobApplicationValues,
  type JobApplicationFormData,
} from "../schemas/jobApplicationSchema.ts";
import {
  submitJobApplication,
  type ApiSimulationMode,
  type ApiSuccessResponse,
} from "../api/mockJobApi.ts";
import {
  step1Fields,
  getStep2EducationFields,
  step3FresherFields,
  getStep3ExperiencedFields,
  step4Fields,
} from "../schemas/stepFields.ts";

import { Step1PersonalDetails } from "./steps/Step1PersonalDetails.tsx";
import { Step2Education } from "./steps/Step2Education.tsx";
import { Step3Experience } from "./steps/Step3Experience.tsx";
import { Step4ApplicationDetails } from "./steps/Step4ApplicationDetails.tsx";
import { Step5ReviewSubmit } from "./steps/Step5ReviewSubmit.tsx";

const STEPS = [
  { id: 1, title: "Personal Details", short: "Personal" },
  { id: 2, title: "Education", short: "Education" },
  { id: 3, title: "Experience", short: "Experience" },
  { id: 4, title: "Application Details", short: "Application" },
  { id: 5, title: "Review & Submit", short: "Review" },
];

export const JobApplicationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitArmed, setIsSubmitArmed] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<ApiSuccessResponse | null>(null);
  const [simulationMode, setSimulationMode] = useState<ApiSimulationMode>("success");

  const stepContainerRef = useRef<HTMLDivElement>(null);

  const methods = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: "onTouched",
    defaultValues: defaultJobApplicationValues,
  });

  const { trigger, getValues, setError, reset, setFocus } = methods;

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    const focusTimer = setTimeout(() => {
      stepContainerRef.current?.focus();
    }, 60);

    if (currentStep === 5) {
      const armTimer = setTimeout(() => {
        setIsSubmitArmed(true);
      }, 700);

      return () => {
        clearTimeout(focusTimer);
        clearTimeout(armTimer);
      };
    }

    return () => clearTimeout(focusTimer);
  }, [currentStep]);

  const validateCurrentStep = async (): Promise<boolean> => {
    setServerError(null);

    switch (currentStep) {
      case 1:
        return await trigger(step1Fields, { shouldFocus: true });

      case 2: {
        const eduCount = getValues("education")?.length || 0;
        if (eduCount === 0) {
          setError("education", {
            type: "manual",
            message: "At least one education qualification is required",
          });
          return false;
        }
        return await trigger(getStep2EducationFields(eduCount), { shouldFocus: true });
      }

      case 3: {
        const applicantType = getValues("experience.applicantType");
        if (applicantType === "fresher") {
          return await trigger(step3FresherFields, { shouldFocus: true });
        } else {
          const compCount = getValues("experience.previousCompanies" as const)?.length || 0;
          return await trigger(getStep3ExperiencedFields(compCount), { shouldFocus: true });
        }
      }

      case 4:
        return await trigger(step4Fields, { shouldFocus: true });

      case 5:
        return await trigger(undefined, { shouldFocus: true });

      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < 5) {
      setIsSubmitArmed(false);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setServerError(null);
    setIsSubmitArmed(false);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleJumpToStep = (step: number) => {
    setServerError(null);
    setIsSubmitArmed(false);
    setCurrentStep(step);
  };

  const handleFinalSubmit = async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (currentStep !== 5 || !isSubmitArmed || isSubmitting) {
      return;
    }

    setServerError(null);

    const isStepValid = await validateCurrentStep();
    if (!isStepValid) return;

    const data = getValues();
    setIsSubmitting(true);

    try {
      const response = await submitJobApplication(data, simulationMode);

      if (response.status === "success") {
        setSubmissionSuccess(response);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (response.status === "field_error") {
        Object.entries(response.fieldErrors).forEach(([fieldPath, message]) => {
          setError(fieldPath as FieldPath<JobApplicationFormData>, {
            type: "server",
            message,
          });
        });

        setServerError(
          `${response.message} Please correct the highlighted field in Step 1.`
        );

        if (response.fieldErrors["personalDetails.email"]) {
          setCurrentStep(1);
          setTimeout(() => {
            setFocus("personalDetails.email");
          }, 120);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (response.status === "server_error") {
        setServerError(response.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setServerError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewApplication = () => {
    reset(defaultJobApplicationValues);
    setSubmissionSuccess(null);
    setServerError(null);
    setCurrentStep(1);
  };

  // Render Success Confirmation View
  if (submissionSuccess) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm text-center" role="region" aria-label="Application Submission Success">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 text-2xl font-bold border-2 border-emerald-300 mb-4">
          ✓
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
        <p className="text-xs text-gray-600 mb-6">{submissionSuccess.message}</p>

        <div className="max-w-md mx-auto p-4 bg-gray-50 border border-gray-200 rounded-md text-left text-xs mb-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <dt className="text-gray-500 font-medium">Application ID:</dt>
              <dd className="text-gray-900 font-bold">{submissionSuccess.applicationId}</dd>
            </div>
            <div>
              <dt className="text-gray-500 font-medium">Candidate Name:</dt>
              <dd className="text-gray-900 font-semibold">{submissionSuccess.candidateName}</dd>
            </div>
            <div>
              <dt className="text-gray-500 font-medium">Position Applied:</dt>
              <dd className="text-gray-900 font-semibold">{submissionSuccess.position}</dd>
            </div>
            <div>
              <dt className="text-gray-500 font-medium">Submitted At:</dt>
              <dd className="text-gray-900">{submissionSuccess.submittedAt}</dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          onClick={handleStartNewApplication}
          className="px-4 py-2 text-xs font-semibold text-white bg-gray-900 rounded-md hover:bg-black transition cursor-pointer"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm" role="region" aria-label="Job Application Wizard">
      <header className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Job Application</h1>
        {/* Stepper */}
        <nav aria-label="Application Progress">
          <ol className="flex gap-2 overflow-x-auto pb-1" role="list">
            {STEPS.map((step) => {
              const isCurrent = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <li key={step.id} className="flex-1 min-w-[80px]">
                  <button
                    type="button"
                    onClick={() => {
                      if (step.id < currentStep) {
                        handleJumpToStep(step.id);
                      }
                    }}
                    disabled={step.id > currentStep}
                    className={`w-full py-1.5 px-2 text-xs rounded-md border text-center transition ${
                      isCurrent
                        ? "border-gray-800 text-gray-900 font-semibold"
                        : isCompleted
                        ? "border-gray-300 text-gray-700 hover:border-gray-500 cursor-pointer"
                        : "border-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <span>
                      {isCompleted ? "✓ " : `${step.id}. `}
                      {step.short}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </header>

      {/* Global Server Error Banner */}
      {serverError && (
        <div role="alert" className="mb-5 p-3 bg-red-50 border border-red-300 rounded-md text-xs text-red-800 flex items-start gap-2.5">
          <span className="text-base" aria-hidden="true">⚠️</span>
          <div>
            <strong className="block font-semibold">Action Required:</strong>
            <p className="mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      {/* Form Area */}
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === 5 && isSubmitArmed) {
              handleFinalSubmit(e);
            }
          }}
          noValidate
        >
          <div
            ref={stepContainerRef}
            tabIndex={-1}
            className="outline-none"
          >
            {currentStep === 1 && <Step1PersonalDetails />}
            {currentStep === 2 && <Step2Education />}
            {currentStep === 3 && <Step3Experience />}
            {currentStep === 4 && <Step4ApplicationDetails />}
            {currentStep === 5 && (
              <Step5ReviewSubmit
                onJumpToStep={handleJumpToStep}
                simulationMode={simulationMode}
                onSimulationModeChange={setSimulationMode}
              />
            )}
          </div>

          <footer className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <div>
              {currentStep < 5 ? (
                <button
                  key="btn-next-step"
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gray-900 rounded-md hover:bg-black transition cursor-pointer"
                >
                  Next: {STEPS[currentStep]?.short} →
                </button>
              ) : (
                <button
                  key="btn-submit-step"
                  type="button"
                  onClick={() => handleFinalSubmit()}
                  disabled={isSubmitting || !isSubmitArmed}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gray-900 rounded-md hover:bg-black disabled:opacity-50 transition cursor-pointer"
                  aria-disabled={isSubmitting || !isSubmitArmed}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" aria-hidden="true" />
                      Submitting Application...
                    </span>
                  ) : !isSubmitArmed ? (
                    "Review Details..."
                  ) : (
                    "Submit Application"
                  )}
                </button>
              )}
            </div>
          </footer>
        </form>
      </FormProvider>
    </div>
  );
};
