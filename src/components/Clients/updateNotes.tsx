import React, { useState } from "react";
import { api } from "~/utils/api";

interface UserNotesProps {
    closeModal: () => void;
    userId: string;
    userNotes: string;
}

interface UserData {
    userId: string;
    notes: string;
}

export default function EditUserNotes({
    closeModal,
    userId,
    userNotes,
}: UserNotesProps) {
    const ctx = api.useContext();
    const [notes, setNotes] = useState(userNotes);

    const { mutate } = api.user.updateNotes.useMutation({
        onSuccess: () => {
            void ctx.user.getAllUsers.invalidate();
            void ctx.user.getUserById.invalidate();
            void ctx.user.invalidate();
            closeModal();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId && userNotes && notes) {
            const data: UserData = {
                userId,
                notes: notes,
            };
            mutate(data);
        }
    };

    return (
        <form className="flex w-[600px] flex-col items-center justify-center text-xl text-white">
            <textarea
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
                className=" h-96 w-full rounded-2xl bg-darkGlass p-10 shadow-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <div className="mt-5 flex justify-center">
                <button
                    onClick={submit}
                    className=" rounded-2xl bg-glass p-2 shadow-lg"
                >
                    Submit 😊
                </button>
            </div>
        </form>
    );
}
