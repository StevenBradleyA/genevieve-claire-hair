import { DotLoader } from "react-spinners";
import type { User } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";

interface UserNotesProps {
    closeModal: () => void;
    user: User;
    isLoading: boolean;
}

interface UserData {
    userId: string;
    firstName: string;
    lastName: string;
    notes: string;
}

export default function EditUserNotes({
    closeModal,
    user,
    isLoading,
}: UserNotesProps) {
    const ctx = api.useContext();
    const [notes, setNotes] = useState(user.notes);

    const { mutate } = api.user.updateNewUser.useMutation({
        onSuccess: () => {
            void ctx.user.getAllUsers.invalidate();
            void ctx.user.getUserById.invalidate();
            void ctx.user.invalidate();
            closeModal();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user && user.firstName && user.lastName && user.notes && notes) {
            const data: UserData = {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                notes: notes,
            };
            mutate(data);
        }
    };

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
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
                className=" h-96 w-full rounded-2xl bg-lightPurple p-10 text-xl text-white shadow-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <button onClick={submit}> update </button>
        </form>
    );
}
