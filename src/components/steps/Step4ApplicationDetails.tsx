import React from "react";
import { InputField } from "../fields/InputField.tsx";
import { SelectField } from "../fields/SelectField.tsx";
import { TextareaField } from "../fields/TextareaField.tsx";
import { CheckboxField } from "../fields/CheckboxField.tsx";

const POSITION_OPTIONS = [
  { value: "Web Frontend Engineer", label: "Web Frontend Engineer" },
  { value: "Web Backend Engineer", label: "Web Backend Engineer" },
  { value: "Java Backend Engineer", label: "Java Backend Engineer" },
  { value: "AI Engineer", label: "AI Engineer" },
  { value: "iOS Engineer", label: "iOS Engineer" },
  { value: "Android Engineer", label: "Android Engineer" },
];

export const Step4ApplicationDetails: React.FC = () => {
  return (
    <section aria-labelledby="step-4-title" className="py-2">
      <h2 id="step-4-title" className="text-base font-bold text-gray-900 mb-5">
        Step 4: Application Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SelectField
          name="applicationDetails.positionApplied"
          label="Position Applied For"
          placeholder="Select an open position"
          options={POSITION_OPTIONS}
          required
        />

        <InputField
          name="applicationDetails.expectedJoiningDate"
          label="Expected Joining Date"
          type="date"
          hint="Must be in the future (and account for notice period)"
          required
        />
      </div>

      <div className="mb-4">
        <InputField
          name="applicationDetails.portfolioLink"
          label="Portfolio / GitHub / LinkedIn URL (Optional)"
          type="url"
          placeholder="https://github.com/your-username"
          hint="Must start with http:// or https://"
        />
      </div>

      <div className="mb-5">
        <TextareaField
          name="applicationDetails.coverNote"
          label="Cover Note / Introduction (Optional)"
          placeholder="Share a brief introduction or highlight your key accomplishments..."
          maxLength={1000}
          rows={4}
        />
      </div>

      <div className="pt-2">
        <CheckboxField
          name="applicationDetails.acceptanceOfTerms"
          label={
            <span>
              I certify that all information provided is true and accurate. I accept the{" "}
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Terms & Conditions: By submitting, you consent to having your application processed for recruitment.");
                }}
                className="text-blue-600 underline hover:text-blue-800"
              >
                terms and conditions
              </a>.
            </span>
          }
          required
        />
      </div>
    </section>
  );
};
