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
    phoneNumber: string;
}

export default function EditUserNotes({
    closeModal,
    user,
    isLoading,
}: UserNotesProps) {
    const ctx = api.useContext();
    const [notes, setNotes] = useState(user.notes);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

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
        if (user && firstName && lastName && user.notes && notes) {
            const data: UserData = {
                userId: user.id,
                firstName: firstName,
                lastName: lastName,
                notes: notes,
                phoneNumber: phoneNumber,
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
        <form className="flex w-[600px] flex-col items-center justify-center text-xl text-white">
            <label>
                Client's first name   
                <input
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mb-5 rounded-md bg-darkGlass p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="(999) 999-9999"
                />
            </label>
            <label>
                Client's last name   
                <input
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mb-5 rounded-md bg-darkGlass p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="(999) 999-9999"
                />
            </label>
            <label>
                Client's number   
                <input
                    value={phoneNumber || ""}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mb-5 rounded-md bg-darkGlass p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="(999) 999-9999"
                />
            </label>
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
