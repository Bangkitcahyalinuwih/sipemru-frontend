/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "orbit": "orbit 15s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float-subtle": "floatSubtle 8s ease-in-out infinite",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(150px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(150px) rotate(-360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 50px rgba(59,130,246,0.7)",
            transform: "scale(1.1)"
          }
        },
        floatSubtle: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(2deg)" },
          "66%": { transform: "translateY(-3px) rotate(-1deg)" }
        }
      },
    },
  },
  plugins: [
    // Enhanced grid plugin
    function({ matchUtilities, theme }) {
      matchUtilities({
        "bg-grid": (value) => ({
          backgroundImage: `
            radial-gradient(circle at 1px 1px, ${value} 1px, transparent 0),
            radial-gradient(circle at 1px 1px, ${value} 1px, transparent 0),
            linear-gradient(to right, transparent 1px, ${value} 1px),
            linear-gradient(to bottom, transparent 1px, ${value} 1px)
          `,
        }),
      }, {
        values: theme("colors")
      });
    },
    // Custom utilities
    function({ addUtilities }) {
      addUtilities({
        ".dot-field-container": {
          position: "fixed",
          inset: "0",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: "0"
        },
        ".dot-field__dot": {
          position: "absolute",
          borderRadius: "50%",
          willChange: "transform, opacity",
          contain: "layout style paint"
        },
        ".dot-field__mouse-glow-outer": {
          position: "absolute",
          borderRadius: "50%",
          backdropFilter: "blur(20px)",
          pointerEvents: "none",
          width: "120px",
          height: "120px"
        },
        ".dot-field__mouse-glow-inner": {
          position: "absolute",
          borderRadius: "50%",
          pointerEvents: "none",
          width: "80px",
          height: "80px",
          backdropFilter: "blur(30px)"
        }
      });
    }
  ],
};