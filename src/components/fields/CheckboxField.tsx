import React from "react";
import { useFormContext } from "react-hook-form";
import { getNestedError } from "./formUtils.ts";

export interface CheckboxFieldProps {
  name: string;
  label: React.ReactNode;
  required?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
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
      <div className="flex items-start gap-2.5">
        <input
          id={fieldId}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-required={required}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-600 cursor-pointer"
          {...register(name)}
        />
        <label
          htmlFor={fieldId}
          className="text-xs text-gray-700 leading-relaxed cursor-pointer select-none"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-1 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
