import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                beigeLlama: "#EEDBCE",
                cream: "#efe0d4",
                creamPuff: "#EEE9DC",
                peach: "#FFDAB9",
                toastedMarshmallow: "#EAE1D6",
                chillPurple: "#E3D4F4",
                lightPurple: "#E5DFFF",
                glass: "rgba(255, 255, 255, 0.2)",
                darkGlass: "rgba(0, 0, 0, 0.05)",
                darkerGlass: "rgba(0, 0, 0, 0.15)",
                clear: "rgba(255, 255, 255, 0)",
                hackingtime: "#222",
            },
            fontFamily: {
                "dm-serif-display": ['"DM Serif Display"', "serif"],
                cookie: ['"Cookie"', "cursive"],
                "grand-hotel": ["Grand Hotel", "cursive"],
                "dancing-script": ['"Dancing Script"', "cursive"],
                raleway: ["var(--font-raleway)"],
            },
            screens: {
                mobile: "320px",
                full: "1920px",
                ultrawide: "2560px",
            },
        },
    },
    plugins: [],
} satisfies Config;
