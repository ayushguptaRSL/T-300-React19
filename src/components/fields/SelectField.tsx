import React from "react";
import { useFormContext } from "react-hook-form";
import { getNestedError } from "./formUtils.ts";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  required,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldId = name.replace(/[^a-zA-Z0-9_-]/g, "_");
  const errorId = `${fieldId}-error`;
  const error = getNestedError(errors, name);

  return (
    <div className="flex flex-col">
      <label htmlFor={fieldId} className="text-xs font-semibold text-gray-700 mb-1 flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>

      <select
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md outline-none transition ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
        }`}
        {...register(name)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-1 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
