import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { getNestedError } from "./formUtils.ts";

export interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

const IsolatedCharCount: React.FC<{ name: string; maxLength: number }> = ({
  name,
  maxLength,
}) => {
  const { control } = useFormContext();
  const value = useWatch({ control, name, defaultValue: "" });
  const count = typeof value === "string" ? value.length : 0;

  return (
    <span className="text-xs text-gray-500" aria-live="polite">
      {count} / {maxLength}
    </span>
  );
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
  name,
  label,
  placeholder,
  maxLength,
  rows = 4,
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
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={fieldId} className="text-xs font-semibold text-gray-700">
          {label}
        </label>
        {maxLength && <IsolatedCharCount name={name} maxLength={maxLength} />}
      </div>

      <textarea
        id={fieldId}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md outline-none transition resize-y ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
        }`}
        {...register(name)}
      />

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-1 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
