import React from "react";
import { useFormContext } from "react-hook-form";
import type { JobApplicationFormData } from "../../schemas/jobApplicationSchema.ts";
import type { ApiSimulationMode } from "../../api/mockJobApi.ts";

export interface Step5ReviewSubmitProps {
  onJumpToStep: (step: number) => void;
  simulationMode: ApiSimulationMode;
  onSimulationModeChange: (mode: ApiSimulationMode) => void;
}

export const Step5ReviewSubmit: React.FC<Step5ReviewSubmitProps> = ({
  onJumpToStep,
  simulationMode,
  onSimulationModeChange,
}) => {
  const { getValues } = useFormContext<JobApplicationFormData>();
  const formData = getValues();

  const { personalDetails, education, experience, applicationDetails } = formData;

  return (
    <section aria-labelledby="step-5-title" className="py-2">
      <h2 id="step-5-title" className="text-base font-bold text-gray-900 mb-5">
        Step 5: Review & Submit
      </h2>

      {/* Review Section 1: Personal Details */}
      <div className="p-4 bg-white border border-gray-300 rounded-md mb-3">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-800">1. Personal Details</h3>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
            aria-label="Edit personal details"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div>
            <dt className="text-gray-500 font-medium">Full Name:</dt>
            <dd className="text-gray-900 font-semibold">{personalDetails.fullName || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium">Email:</dt>
            <dd className="text-gray-900 font-semibold">{personalDetails.email || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium">Phone:</dt>
            <dd className="text-gray-900 font-semibold">{personalDetails.phone || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium">Date of Birth:</dt>
            <dd className="text-gray-900 font-semibold">{personalDetails.dateOfBirth || "—"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-gray-500 font-medium">Current City:</dt>
            <dd className="text-gray-900 font-semibold">{personalDetails.currentCity || "—"}</dd>
          </div>
        </dl>
      </div>

      {/* Review Section 2: Education */}
      <div className="p-4 bg-white border border-gray-300 rounded-md mb-3">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-800">2. Education Qualifications</h3>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
            aria-label="Edit education qualifications"
          >
            Edit
          </button>
        </div>
        {education && education.length > 0 ? (
          <div className="space-y-2 text-xs">
            {education.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-gray-50 border border-gray-200 rounded">
                <span className="font-semibold text-gray-900 block">
                  {idx + 1}. {item.degree || "Untitled Qualification"}
                </span>
                <span className="text-gray-600 block mt-0.5">
                  {item.institution} ({isNaN(item.yearOfPassing) ? "—" : item.yearOfPassing}) •{" "}
                  {isNaN(item.percentage) ? "—" : `${item.percentage}%`}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No qualifications added.</p>
        )}
      </div>

      {/* Review Section 3: Experience */}
      <div className="p-4 bg-white border border-gray-300 rounded-md mb-3">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-800">3. Experience Details</h3>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
            aria-label="Edit experience details"
          >
            Edit
          </button>
        </div>
        {experience.applicantType === "fresher" ? (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <dt className="text-gray-500 font-medium">Applicant Type:</dt>
              <dd className="text-gray-900 font-semibold">Fresher / New Graduate</dd>
            </div>
            <div>
              <dt className="text-gray-500 font-medium">Availability to Join:</dt>
              <dd className="text-gray-900 font-semibold">{experience.availabilityToJoin || "—"}</dd>
            </div>
          </dl>
        ) : (
          <div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <dt className="text-gray-500 font-medium">Applicant Type:</dt>
                <dd className="text-gray-900 font-semibold">Experienced Professional</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Total Experience:</dt>
                <dd className="text-gray-900 font-semibold">
                  {isNaN(experience.totalExperienceYears)
                    ? "—"
                    : `${experience.totalExperienceYears} years`}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Notice Period:</dt>
                <dd className="text-gray-900 font-semibold">
                  {isNaN(experience.noticePeriodDays)
                    ? "—"
                    : `${experience.noticePeriodDays} days`}
                </dd>
              </div>
            </dl>
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Previous Companies:</h4>
            {experience.previousCompanies && experience.previousCompanies.length > 0 ? (
              <div className="space-y-2 text-xs">
                {experience.previousCompanies.map((c, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 border border-gray-200 rounded">
                    <span className="font-semibold text-gray-900 block">
                      {idx + 1}. {c.role} at {c.companyName}
                    </span>
                    <span className="text-gray-600 block mt-0.5">
                      {c.fromDate} to {c.toDate}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No company history added.</p>
            )}
          </div>
        )}
      </div>

      {/* Review Section 4: Application Details */}
      <div className="p-4 bg-white border border-gray-300 rounded-md mb-3">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-800">4. Application Details</h3>
          <button
            type="button"
            onClick={() => onJumpToStep(4)}
            className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
            aria-label="Edit application details"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div>
            <dt className="text-gray-500 font-medium">Position Applied:</dt>
            <dd className="text-gray-900 font-semibold">{applicationDetails.positionApplied || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium">Expected Joining Date:</dt>
            <dd className="text-gray-900 font-semibold">{applicationDetails.expectedJoiningDate || "—"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-gray-500 font-medium">Portfolio / Links:</dt>
            <dd className="text-gray-900 font-semibold">
              {applicationDetails.portfolioLink ? (
                <a
                  href={applicationDetails.portfolioLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {applicationDetails.portfolioLink}
                </a>
              ) : (
                "None provided"
              )}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-gray-500 font-medium">Cover Note:</dt>
            <dd className="text-gray-900">{applicationDetails.coverNote || "None provided"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-gray-500 font-medium">Terms & Conditions:</dt>
            <dd className="text-emerald-700 font-semibold">
              {applicationDetails.acceptanceOfTerms ? "✓ Accepted" : "Not accepted"}
            </dd>
          </div>
        </dl>
      </div>

      {/* Evaluator Simulation Control Panel */}
      <div className="mt-5 p-4 bg-gray-50 border border-dashed border-gray-300 rounded-md">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase bg-gray-800 text-white px-2 py-0.5 rounded">
            Evaluator Testing Control
          </span>
          <span className="text-xs text-gray-600">
            Select Mock API response mode:
          </span>
        </div>
        <div className="space-y-1.5 text-xs text-gray-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="evaluatorSimulation"
              value="success"
              checked={simulationMode === "success"}
              onChange={() => onSimulationModeChange("success")}
              className="text-gray-800 border-gray-300"
            />
            <span>🟢 Success (200 OK)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="evaluatorSimulation"
              value="field_error"
              checked={simulationMode === "field_error"}
              onChange={() => onSimulationModeChange("field_error")}
              className="text-gray-800 border-gray-300"
            />
            <span>🟡 Field Validation Failure (Email Error)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="evaluatorSimulation"
              value="server_error"
              checked={simulationMode === "server_error"}
              onChange={() => onSimulationModeChange("server_error")}
              className="text-gray-800 border-gray-300"
            />
            <span>🔴 Server Error (500)</span>
          </label>
        </div>
      </div>
    </section>
  );
};
