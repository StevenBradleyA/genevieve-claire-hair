import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                beigeLlama: "#EEDBCE",
                cream: "#efe0d4",
                creamPuff: "#EEE9DC",
                coral: "#FF7F50",
                peach: "#FFDAB9",
                toastedMarshmallow: "#EAE1D6",
            },
            fontFamily: {
                "dm-serif-display": ['"DM Serif Display"', "serif"],
                "quattrocento": ['"Quattrocento"', "serif"],
                "cookie": ['"Cookie"', "cursive"],
                "grand-hotel": ['"Grand Hotel"', "cursive"],
                "dancing-script": ['"Dancing Script"', "cursive"],
            },
        },
    },
    plugins: [],
} satisfies Config;
