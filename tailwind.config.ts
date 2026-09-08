import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Raw brand palette — derived from the Lockside bull mark (#24180C / #F0CC6C)
           and the printed main menu's red steak panel (#A82A22). */
        ink: "#14100B",
        surface: "#1F1710",
        elevated: "#2C2117",
        parchment: "#F4EFE4",
        bone: "#FBF8F2",
        brass: { DEFAULT: "#F0CC6C", deep: "#C99F3F", dim: "#7C6326" },
        ember: { DEFAULT: "#A82A22", deep: "#7E1D18" },
        /* Semantic tokens — resolved from CSS variables so a section can flip
           between the dark and light surface without component changes. */
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-subtle": "var(--fg-subtle)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-contrast": "var(--accent-contrast)",
        state: { error: "#D14A3E", success: "#4A8A5C" },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "Haettenschweiler", "sans-serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.22em" }],
      },
      maxWidth: { content: "76rem", prose: "38rem" },
      borderRadius: { card: "3px" },
      boxShadow: {
        lift: "0 24px 60px -24px rgba(0,0,0,0.55)",
        "lift-light": "0 20px 44px -22px rgba(36,26,12,0.28)",
      },
      transitionTimingFunction: { swift: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-rise": "fade-rise 0.7s cubic-bezier(0.22,0.61,0.36,1) both" },
    },
  },
  plugins: [],
} satisfies Config;
