import React from "react";
import { useFormContext } from "react-hook-form";
import { getNestedError } from "./formUtils.ts";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  name,
  label,
  options,
  required,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const groupError = getNestedError(errors, name);
  const errorId = `${name.replace(/[^a-zA-Z0-9_-]/g, "_")}-error`;

  return (
    <fieldset className="mb-4">
      <legend className="text-xs font-semibold text-gray-700 mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
        {options.map((opt) => {
          const optionId = `${name}_${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={optionId}
              className="flex items-start gap-3 p-3 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus-within:border-gray-700 focus-within:ring-1 focus-within:ring-gray-700 transition"
            >
              <input
                id={optionId}
                type="radio"
                value={opt.value}
                aria-invalid={!!groupError}
                aria-describedby={groupError ? errorId : undefined}
                className="mt-0.5 h-4 w-4 text-gray-800 border-gray-300 cursor-pointer"
                {...register(name)}
              />
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-gray-900">{opt.label}</span>
                {opt.description && (
                  <span className="text-xs text-gray-500 mt-0.5">{opt.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {groupError && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-1 font-medium">
          {groupError.message}
        </p>
      )}
    </fieldset>
  );
};
