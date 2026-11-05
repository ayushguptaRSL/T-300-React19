import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { InputField } from "../fields/InputField.tsx";
import type { JobApplicationFormData } from "../../schemas/jobApplicationSchema.ts";
import { getNestedError } from "../fields/formUtils.ts";

export const Step2Education: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JobApplicationFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const arrayError = getNestedError(errors, "education");

  const handleAddQualification = () => {
    append({
      degree: "",
      institution: "",
      yearOfPassing: NaN,
      percentage: NaN,
    });
  };

  return (
    <section aria-labelledby="step-2-title" className="py-2">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h2 id="step-2-title" className="text-base font-bold text-gray-900 mb-5">
            Step 2: Education Qualifications
          </h2>
        </div>
        <button
          type="button"
          onClick={handleAddQualification}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
        >
          + Add Qualification
        </button>
      </div>

      {arrayError && typeof arrayError.message === "string" && (
        <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 font-medium">
          {arrayError.message}
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-gray-50 border border-gray-300 rounded-md">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
              <h3 className="text-xs font-semibold text-gray-800">
                Qualification #{index + 1}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
                  aria-label={`Remove qualification ${index + 1}`}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputField
                name={`education.${index}.degree`}
                label="Degree / Course"
                placeholder="e.g. B.Tech Computer Science"
                required
              />

              <InputField
                name={`education.${index}.institution`}
                label="Institution / University"
                placeholder="e.g. Stanford University"
                required
              />

              <InputField
                name={`education.${index}.yearOfPassing`}
                label="Year of Passing"
                type="number"
                placeholder="e.g. 2023"
                hint="Between 1960 and future"
                required
              />

              <InputField
                name={`education.${index}.percentage`}
                label="Percentage (%)"
                type="number"
                step="0.01"
                placeholder="e.g. 85.5"
                hint="0 - 100%"
                required
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
