import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";

interface UserNotesProps {
    closeModal: () => void;
}

interface UserData {
    userId: string;
    notes: string;
}

export default function EditUserNotes({ closeModal }: UserNotesProps) {
    const ctx = api.useContext();
    const { data: session, update } = useSession();

    const [notes, setNotes] = useState(session?.user?.notes);

    const { mutate } = api.user.updateNotes.useMutation({
        onSuccess: async () => {
            try {
                void ctx.user.getAllUsers.invalidate();
                void ctx.user.getUserById.invalidate();
                void ctx.user.invalidate();
                await update();
                closeModal();
            } catch (error) {
                console.error("Error updating user notes:", error);
            }
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (session && session.user && notes) {
            const data: UserData = {
                userId: session.user.id,
                notes: notes,
            };
            mutate(data);
        }
    };

    return (
        <form className="flex w-[300px] h-[500px] flex-col items-center justify-center text-xl text-purple-300 laptop:w-[800px]">
            <textarea
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
                className=" h-full w-full resize-none rounded-2xl bg-white p-10 shadow-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 "
            />
            <div className="mt-5 flex justify-center">
                <motion.button
                    onClick={submit}
                    className=" rounded-2xl bg-glass px-6 py-2 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Update
                </motion.button>
            </div>
        </form>
    );
}
