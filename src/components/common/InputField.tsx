import type { InputHTMLAttributes, Ref } from 'react';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  label: string;
}

export function InputField({ ref, label, id, ...props }: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input ref={ref} id={id} {...props} />
    </div>
  );
}
