export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
        },
        'brand-text': '#1f2937',
        'brand-muted': '#6b7280',
        'brand-bg': '#f9fafb',
        'brand-card': '#ffffff',
      },
      spacing: {
        dashboard: '1.5rem',
        card: '1rem',
        sidebar: '16rem',
      },
      borderRadius: {
        brand: '0.5rem',
      },
    },
  },
  plugins: [],
}
