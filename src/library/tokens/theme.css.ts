import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryActive: '#1e40af',
    primaryText: '#ffffff',

    secondary: '#e2e8f0',
    secondaryHover: '#cbd5e1',
    secondaryActive: '#94a3b8',
    secondaryText: '#1e293b',

    danger: '#dc2626',
    dangerHover: '#b91c1c',
    dangerActive: '#991b1b',
    dangerText: '#ffffff',

    success: '#16a34a',
    successLight: '#f0fdf4',
    successBorder: '#bbf7d0',
    successText: '#15803d',

    warning: '#d97706',
    warningLight: '#fffbeb',
    warningBorder: '#fde68a',
    warningText: '#b45309',

    errorLight: '#fef2f2',
    errorBorder: '#fecaca',
    errorText: '#b91c1c',

    surface: '#ffffff',
    surfaceElevated: '#ffffff',
    background: '#f8fafc',
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    textMuted: '#64748b',

    borderSubtle: '#f1f5f9',
    borderDefault: '#cbd5e1',
    borderStrong: '#94a3b8',
    focusRing: '#2563eb',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radii: {
    sm: '4px',
    md: '6px',
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      mono: 'Consolas, "Courier New", monospace',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
    },
    fontWeight: {
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      normal: '1.5',
    },
  },
  shadows: {
    none: 'none',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.12)',
  },
  transitions: {
    fast: '0.15s ease',
  },
});
