# Job Application form

Multi-step job application form built with React, TypeScript, React Hook Form, Zod, and Tailwind CSS.

## 1. How to Run the Project

```bash
npm install     # Install dependencies
npm run dev     # Start dev server (http://localhost:5173)
npm run build   # Type-check and production build
```

## 2. Schema Organization

Schemas are modularized in `src/schemas/`:
- **Step Schemas**: `personalDetailsSchema`, `educationSchema`, `experienceSchema` (discriminated union for `fresher` vs `experienced`), and `applicationDetailsSchema`.
- **Root Schema (`jobApplicationSchema.ts`)**: Combines step schemas and enforces cross-step validation (expected joining date must respect notice period).
- **Step Field Lists (`stepFields.ts`)**: Typed field name arrays allowing `trigger()` to validate only the current step's fields on progression.
- **Inferred Types**: All types are derived directly from schemas via `z.infer` to prevent duplication.

## 3. Validation Mode & Rationale

- **Mode**: `mode: "onTouched"`
- **Why**:
  - `onChange` triggers premature errors while the user is still typing.
  - `onSubmit` delays feedback until the end of the form.
  - `onTouched` provides the ideal UX: fields stay quiet until blurred, re-validate immediately once dirty, and skipped required fields are caught on "Next" via `trigger()`.

## 4. Form State & Step Sharing

- **State Location**: Form state lives in a single `useForm` instance inside `JobApplicationWizard.tsx`.
- **Sharing Across Steps**: Provided via `<FormProvider>` and accessed in step components with `useFormContext()`.
- **Persistence**: Navigating steps only toggles `currentStep` state within the persistent provider, keeping all form values intact in memory without external state stores.

## 5. Deliberate Re-render Optimizations

1. **Isolated Dynamic Watcher (`ExperienceFieldsWatcher`)**: Scoped `useWatch` for `applicantType` inside a dedicated sub-component, preventing parent re-renders when toggling Fresher/Experienced fields.
2. **Isolated Character Counter (`IsolatedCharCount`)**: `TextareaField` confines live character count updates to an isolated `useWatch` child component, preventing the textarea or form from re-rendering on every keystroke.
3. **Uncontrolled Fields & Review Snapshot**: Inputs use uncontrolled refs via `register()`. Step 5 uses `getValues()` for a static review snapshot rather than subscribing to reactive whole-form `watch()`.