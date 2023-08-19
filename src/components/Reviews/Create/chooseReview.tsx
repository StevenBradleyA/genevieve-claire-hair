import { api } from "~/utils/api";
import { DotLoader } from "react-spinners";
import ModalDialog from "~/components/Modal";
import SelectReview from "~/components/Reviews/Create/selectReview";
import { useState } from "react";
import type { Session } from "next-auth";

export default function ChooseReview({ session }: { session: Session }) {
    const { data: bookings, isLoading } =
        api.booking.getAllBookingsWithoutReviewsByUserId.useQuery(
            session?.user.id
        );

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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleButtonClick = () => {
        if (buttonText) {
            const nextPosition =
                (buttonScript.indexOf(buttonText) + 1) % buttonScript.length;
            setButtonText(buttonScript[nextPosition]);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Reviews are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    return bookings && bookings.length > 0 ? (
        <>
            <button
                onClick={openModal}
                className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-white shadow-none transition-transform hover:scale-110 active:scale-105"
            >
                Leave me a review
            </button>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <SelectReview
                    closeModal={closeModal}
                    bookings={bookings}
                    isLoading={isLoading}
                />
            </ModalDialog>
        </>
    ) : (
        <button
            className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-white shadow-none transition-transform hover:scale-110 active:scale-105"
            onClick={handleButtonClick}
        >
            {buttonText}
        </button>
    );
}
