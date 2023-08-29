import { DotLoader } from "react-spinners";
import type { User } from "@prisma/client";
import { useState } from "react";

interface UserNotesProps {
    closeModal: () => void;
    user: User;
    isLoading: boolean;
}

export default function EditUserNotes({
    closeModal,
    user,
    isLoading,
}: UserNotesProps) {
    const [notes, setNotes] = useState(user.notes);

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Reviews are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    return (
        <form className="w-[600px] ">
            <div className=" my-5 text-center text-xl">
                Use the keyword{" "}
                <span className="rounded-2xl bg-glass p-2 text-purple-300 shadow-lg">
                    poggywoggy
                </span>{" "}
                to start a new line{" "}
            </div>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className=" h-96 w-full rounded-2xl bg-lightPurple p-10 text-xl text-white shadow-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
        </form>
    );
}
