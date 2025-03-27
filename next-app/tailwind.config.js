module.exports = {
    content: ["./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
        },
        fontFamily: {
          sans: "var(--font-sans)",
          mono: "var(--font-mono)",
        },
      },
    },
    plugins: [],
  }
  