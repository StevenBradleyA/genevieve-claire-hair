import { useSession } from "next-auth/react";
import DisplayReviews from "~/components/Reviews/Display";
import { useState } from "react";
import { useMobile } from "~/components/MobileContext";
import ChooseReview from "~/components/Reviews/Create/chooseReview";

export default function Reviews() {
    // TODO make modal for creating and editing a review.
    // TODO Give admin god power to delete a review
    // TODO First name and Last Name on Review
    // TODO Test Modals on mobile
    // ! put button script in own component instead of repeating in choose Review

    const { data: session } = useSession();
    const { isMobile } = useMobile();

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
        <div className="flex w-full flex-col items-center">
            {isMobile ? (
                <div className="flex flex-col items-center gap-10">
                    <h1 className="font-grand-hotel text-8xl text-white ">
                        Reviews
                    </h1>
                    <div className="flex w-[400px] justify-center">
                        {session && session.user ? (
                            <ChooseReview session={session} />
                        ) : (
                            <button
                                className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-white shadow-none transition-transform hover:scale-110 active:scale-105"
                                onClick={handleButtonClick}
                            >
                                {buttonText}
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-32">
                    <h1 className="font-grand-hotel text-9xl text-white ">
                        Reviews
                    </h1>
                    <div className="flex w-[400px] justify-center">
                        {session && session.user ? (
                            <ChooseReview session={session} />
                        ) : (
                            <button
                                className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-white shadow-none transition-transform hover:scale-110 active:scale-105"
                                onClick={handleButtonClick}
                            >
                                {buttonText}
                            </button>
                        )}
                    </div>
                </div>
            )}
            <DisplayReviews />
        </div>
    );
}
