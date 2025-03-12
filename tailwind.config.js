/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
    ],
    theme: {
      extend: {
        colors: {
          'lite-purple': '#A584EC',
          'deep-purple': '#2E2047',
          'lite-green': '#4ACBAE',
          'lite-blue': '#5DA5D1',
          'lite-violet': '#9E5DC5',
          'bright-green': '#45F996',
          'bright-yellow': '#F9C645',
          'bright-red': '#F94545',
          'lilac-white': '#F8EDFF',
          'dull-grey': '#CBC9C9',
        },
      },
    },
    plugins: [],
  };
  