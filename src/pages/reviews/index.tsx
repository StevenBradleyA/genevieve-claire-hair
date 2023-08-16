import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import CreateImage from "../../components/Images/Create";
import DisplayImages from "../../components/Images/Display";
import CreateReview from "~/components/Reviews/Create";
import DisplayReviews from "~/components/Reviews/Display";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import SelectReview from "~/components/Reviews/Create/selectReview";
import { DotLoader } from "react-spinners";

export default function Reviews() {
    // TODO make modal for creating and editing a review.
    // TODO Give admin god power to delete a review
    // TODO First name and Last Name on Review

    const { data: session } = useSession();

    const { data: bookings, isLoading } =
        api.booking.getAllByUserIdWithNoReview.useQuery(session?.user.id);

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
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Reviews are Loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    return (
        <div className="flex w-full flex-col items-center">
            <div className="flex items-center gap-32">
                <h1 className="font-grand-hotel text-9xl text-white ">
                    Reviews
                </h1>
                <div className="flex w-[400px] justify-center">
                    {session && session.user && bookings ? (
                        <div>
                            <button
                                onClick={openModal}
                                className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-gray-800 shadow-none transition-transform hover:scale-110 active:scale-105"
                            >
                                Leave me a review
                            </button>
                            <ModalDialog
                                isOpen={isModalOpen}
                                onClose={closeModal}
                            >
                                <SelectReview closeModal={closeModal} />
                            </ModalDialog>
                        </div>
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
            <DisplayReviews />
        </div>
    );
}
