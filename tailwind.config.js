module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 12 row grid
        12: "repeat(12, minmax(0, 1fr))",
      },
      transitionProperty: {
        width: "width",
      },
      minWidth: {
        250: "250px",
        280: "280px",
        450: "450px",
      },
      fontFamily: {
        roboto: ["roboto"],
        lato: ["lato"],
      },
    },
  },
  variants: {
    transitionProperty: ["responsive", "motion-safe", "motion-reduce"],
    extend: {
      width: ["focus", "hover", "active"],
    },
  },
  plugins: [],
};
