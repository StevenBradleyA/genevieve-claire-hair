import { useState } from "react";

export default function ScriptButton() {
    const buttonScript: string[] = [
        "Leave me a review",
        "woah!",
        "have you booked with me before?",
        "you promise youre signed in too?",
        "you promised tho 🥺",
        "okay, chill",
        "pls",
        "stahp",
        "9th times the charm",
        "alright, I'm gonna leave now",
        "you really thought 💀",
        "okay okay okay fine",
        "ya know, this actually works",
        "when you're qualified to review",
    ];
    const [buttonText, setButtonText] = useState<string | undefined>(
        buttonScript[0]
    );

    const handleButtonClick = () => {
        if (buttonText) {
            const nextPosition =
                (buttonScript.indexOf(buttonText) + 1) % buttonScript.length;
            setButtonText(buttonScript[nextPosition]);
        }
    };

    return (
        <button
            className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-white shadow-none transition-transform hover:scale-110 active:scale-105"
            onClick={handleButtonClick}
        >
            {buttonText}
        </button>
    );
}
