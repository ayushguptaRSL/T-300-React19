import React from "react";
import { InputField } from "../fields/InputField.tsx";

export const Step1PersonalDetails: React.FC = () => {
  return (
    <section aria-labelledby="step-1-title" className="py-2">
      <h2 id="step-1-title" className="text-base font-bold text-gray-900 mb-5">
        Step 1: Personal Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          name="personalDetails.fullName"
          label="Full Name"
          placeholder="e.g. Jane Doe"
          required
        />

        <InputField
          name="personalDetails.email"
          label="Email Address"
          type="email"
          placeholder="e.g. jane.doe@example.com"
          required
        />

        <InputField
          name="personalDetails.phone"
          label="Phone Number"
          type="tel"
          placeholder="e.g. 9876543210"
          hint="Exactly 10 digits"
          required
        />

        <InputField
          name="personalDetails.dateOfBirth"
          label="Date of Birth"
          type="date"
          hint="Must be at least 18 years old"
          required
        />

        <div className="sm:col-span-2">
          <InputField
            name="personalDetails.currentCity"
            label="Current City"
            placeholder="e.g. Pune"
            required
          />
        </div>
      </div>
    </section>
  );
};
