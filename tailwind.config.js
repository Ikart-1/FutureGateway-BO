/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
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
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "pulse-green": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: ".5" },
                },
            },
            animation: {
                "pulse-green": "pulse-green 2s infinite",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};