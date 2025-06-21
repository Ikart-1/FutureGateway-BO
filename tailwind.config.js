/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                arabic: ['"Noto Kufi Arabic"', 'sans-serif'],
            },
            colors: {
                "primary-blue": "#0b3e67",
                "primary-orange": "#f05722",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
