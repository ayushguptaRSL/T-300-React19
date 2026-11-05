import React from "react";
import { useFormContext } from "react-hook-form";
import { getNestedError } from "./formUtils.ts";

export interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  step?: string | number;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  hint,
  required,
  step,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldId = name.replace(/[^a-zA-Z0-9_-]/g, "_");
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const error = getNestedError(errors, name);

  return (
    <div className="flex flex-col">
      <label htmlFor={fieldId} className="text-xs font-semibold text-gray-700 mb-1 flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>

      <input
        id={fieldId}
        type={type}
        placeholder={placeholder}
        step={step}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-required={required}
        className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md outline-none transition ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
        }`}
        {...register(name, {
          valueAsNumber: type === "number",
        })}
      />

      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500 mt-1">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-1 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
