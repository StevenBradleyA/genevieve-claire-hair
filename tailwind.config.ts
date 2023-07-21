import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                peach: "#FFDAB9",
                cream: "#efe0d4",
                coral: "#FF7F50",
            },
        },
    },
    plugins: [],
} satisfies Config;
