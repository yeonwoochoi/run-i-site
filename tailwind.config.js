export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'wave-up': 'waveUp 1s ease-in-out',
        'wave-down': 'waveDown 1s ease-in-out',
      },
      keyframes: {
        waveUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        waveDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
