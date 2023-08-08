import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import CreateImage from "../../components/Images/Create";
import DisplayImages from "../../components/Images/Display";
import CreateReview from "~/components/Reviews/Create";
import DisplayReviews from "~/components/Reviews/Display";
import { useState } from "react";
import ModalDialog from "~/components/Modal";

export default function Reviews() {
    // TODO Decide if we want create review to be linked to a booking
    // could display type of booking on each review
    // positive can see type of booking -- adds credibility
    // negative some clients book over text exclusive lose sample size
    //
    // TODO make modal for creating and editing a review.
    // TODO Add total Star Rating

    // TODO Give admin god power to delete a review
    // TODO Add Date to Review  Month/Year

    // TODO First name and Last Name on Review

    // could make cool progress bar for review have a logo fill up all the way at a five star total etc...

    const { data: session } = useSession();

    const { data: hasReviewed } = api.review.hasReviewed.useQuery({
        userId: session?.user.id,
    });

    const buttonScript: string[] = [
        "Leave me a review",
        "woah!",
        "have you booked with me before?",
        "you promise your signed in too?",
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

    const [isModalOpen, setIsModalOpen] = useState(false); 

    const openModal = () => {
        console.log('Opening modal');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex w-full flex-col items-center">
            <div className="flex items-center gap-32">
                <h1 className="font-grand-hotel text-9xl text-white ">
                    Reviews
                </h1>
                <div className="flex w-[400px] justify-center">
                    {session && session.user && !hasReviewed ? (
                        <button className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-gray-800 shadow-none transition-transform hover:scale-110 active:scale-105">
                            Leave me a review
                        </button>
                    ) : (
                        <button
                            className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-gray-800 shadow-none transition-transform hover:scale-110 active:scale-105"
                            onClick={handleButtonClick}
                        >
                            {buttonText}
                        </button>
                    )}
                </div>
            </div>
            <div>
                {/* {session && session.user && !hasReviewed && ( */}
                <button onClick={openModal}>Open Create Review Modal</button>
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <CreateReview />
                </ModalDialog>
            </div>

            <DisplayReviews />

            {/* <CreateImage />
            <DisplayImages userId="cljyl59i90000ov93qhw2ujsd" /> */}
        </div>
    );
}
