import React from "react";
import { useFormContext, useWatch, useFieldArray } from "react-hook-form";
import { RadioGroupField } from "../fields/RadioGroupField.tsx";
import { InputField } from "../fields/InputField.tsx";
import { SelectField } from "../fields/SelectField.tsx";
import type { JobApplicationFormData } from "../../schemas/jobApplicationSchema.ts";
import { getNestedError } from "../fields/formUtils.ts";

const AVAILABILITY_OPTIONS = [
  { value: "Immediate", label: "Immediate (Within 1 week)" },
  { value: "15 Days", label: "15 Days" },
  { value: "30 Days", label: "30 Days" },
  { value: "45 Days", label: "45 Days" },
  { value: "60+ Days", label: "60+ Days" },
];

const FresherFields: React.FC = () => {
  return (
    <div className="mt-2">
      <SelectField
        name="experience.availabilityToJoin"
        label="Availability to Join"
        placeholder="Select your joining availability"
        options={AVAILABILITY_OPTIONS}
        required
      />
    </div>
  );
};

const ExperiencedFields: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JobApplicationFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience.previousCompanies" as const,
  });

  const arrayError = getNestedError(errors, "experience.previousCompanies");

  const handleAddCompany = () => {
    append({
      companyName: "",
      role: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <div className="mt-2 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField
          name="experience.totalExperienceYears"
          label="Total Experience (Years)"
          type="number"
          step="0.1"
          placeholder="e.g. 3.5"
          hint="Minimum 0.1 years"
          required
        />

        <InputField
          name="experience.noticePeriodDays"
          label="Notice Period (Days)"
          type="number"
          placeholder="e.g. 30"
          hint="e.g. 0 for immediate, 30 for 1 month"
          required
        />
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-5">Previous Companies</h3>
          </div>
          <button
            type="button"
            onClick={handleAddCompany}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
          >
            + Add Company
          </button>
        </div>

        {arrayError && typeof arrayError.message === "string" && (
          <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 font-medium">
            {arrayError.message}
          </div>
        )}

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-50 border border-gray-300 rounded-md">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <h4 className="text-xs font-semibold text-gray-800">Company #{index + 1}</h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
                    aria-label={`Remove company ${index + 1}`}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  name={`experience.previousCompanies.${index}.companyName`}
                  label="Company Name"
                  placeholder="e.g. Acme Corp"
                  required
                />

                <InputField
                  name={`experience.previousCompanies.${index}.role`}
                  label="Role / Designation"
                  placeholder="e.g. Frontend Engineer"
                  required
                />

                <InputField
                  name={`experience.previousCompanies.${index}.fromDate`}
                  label="From Date"
                  type="date"
                  required
                />

                <InputField
                  name={`experience.previousCompanies.${index}.toDate`}
                  label="To Date"
                  type="date"
                  hint="Must be after From Date"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExperienceFieldsWatcher: React.FC = () => {
  const { control, setValue, getValues } = useFormContext<JobApplicationFormData>();

  const applicantType = useWatch({
    control,
    name: "experience.applicantType",
    defaultValue: "fresher",
  });

  React.useEffect(() => {
    if (applicantType === "experienced") {
      const currentCompanies = getValues("experience.previousCompanies" as const);
      if (!currentCompanies || currentCompanies.length === 0) {
        setValue("experience.previousCompanies" as const, [
          { companyName: "", role: "", fromDate: "", toDate: "" },
        ]);
      }
    }
  }, [applicantType, getValues, setValue]);

  return applicantType === "fresher" ? <FresherFields /> : <ExperiencedFields />;
};

export const Step3Experience: React.FC = () => {
  return (
    <section aria-labelledby="step-3-title" className="py-2">
      <h2 id="step-3-title" className="text-base font-bold text-gray-900 mb-1">
        Step 3: Experience Details
      </h2>
      <p className="text-xs text-gray-600 mb-4">
        Select whether you are applying as a fresher or with prior industry experience.
      </p>

      <RadioGroupField
        name="experience.applicantType"
        label="Applicant Type"
        options={[
          {
            value: "fresher",
            label: "Fresher / New Graduate",
            description: "No prior full-time corporate work experience",
          },
          {
            value: "experienced",
            label: "Experienced Professional",
            description: "Have previously worked in software/technology companies",
          },
        ]}
        required
      />

      <ExperienceFieldsWatcher />
    </section>
  );
};
