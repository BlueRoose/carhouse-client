/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {
            screens: {
                "max-2xl": { max: "1535px" },
                "max-xl": { max: "1279px" },
                "max-lg": { max: "1023px" },
                "max-md": { max: "767px" },
                "max-sm": { max: "640px" },
                "max-s": { max: "480px" },
                "max-xs": { max: "380px" },
                "2xl": { min: "1536px" },
                xl: { min: "1280px" },
                lg: { min: "1024px" },
                md: { min: "768px" },
                sm: { min: "641px" },
                s: { min: "481px" },
            },
            colors: {
                main: {
                    'yellow': '#ffd600',
                    'dark': '#272727',
                    'gray': '#979797',
                    'dark-gray': '#595959',
                },
            },
        },
    },
    plugins: [],
};
