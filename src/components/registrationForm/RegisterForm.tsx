import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useAuth } from '../../context/AuthProvider.tsx';
import './RegisterForm.css';

interface RegisterState {
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  error: null,
  success: false,
};

// Child component to consume form status via useFormStatus()
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? 'Registering...' : 'Register'}
    </button>
  );
}

interface RegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RegisterForm({ onSuccess, onCancel }: RegisterFormProps) {
  const { setUser } = useAuth();

  const [state, formAction] = useActionState(
    async (_prevState: RegisterState, formData: FormData): Promise<RegisterState> => {
      const name = (formData.get('name') as string)?.trim();
      const email = (formData.get('email') as string)?.trim();
      const password = formData.get('password') as string;

      if (!name || name.length < 2) {
        return { error: 'Name must be at least 2 characters long.', success: false };
      }
      if (!email || !email.includes('@')) {
        return { error: 'Please enter a valid email address.', success: false };
      }
      if (!password || password.length < 6) {
        return { error: 'Password must be at least 6 characters long.', success: false };
      }

      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Save user in React 19 Context
      setUser({ name, email });
      onSuccess?.();

      return { error: null, success: true };
    },
    initialState
  );

  return (
    <section className="form-card" aria-label="Registration Form">
      <h2>Create an Account</h2>
      <p className="subtitle">Register to store your user details in Context</p>

      {state.error && <p className="form-error">{state.error}</p>}
      {state.success && <p className="form-success">Registration successful!</p>}

      <form action={formAction} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="enter the naem..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="enter the email.."
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="enter your password..."
          />
        </div>

        <div className="form-actions">
          <SubmitButton />
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
