import { useSession } from "next-auth/react";
import { useState } from "react";
import { format } from "date-fns";
import type { Booking } from "@prisma/client";
import ModalDialog from "~/components/Modal";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import AdminUpdateBooking from "../AdminUpdate";
import toast from "react-hot-toast";

export default function BookingCard({ booking }: { booking: Booking }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [textSelect, setTextSelect] = useState<boolean>(false);
    const [emailSelect, setEmailSelect] = useState<boolean>(true);

    const { data: user } = api.user.getUserById.useQuery(booking.userId);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { startDate, endDate, type, status } = booking;

    const ctx = api.useContext();

    const { mutate } = api.booking.delete.useMutation({
        onSuccess: () => {
            toast.success("Booking Deleted!", {
                icon: "🗑️",
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#d8b4fe",
                },
            });
            void ctx.booking.getFuture.invalidate();
            void ctx.booking.getPast.invalidate();
            void ctx.schedule.getNormalizedDays.invalidate();
            void ctx.schedule.getAllDays.invalidate();
        },
    });

    const { mutate: sendEmail } = api.booking.sendEmailConfirmation.useMutation(
        {
            onSuccess: () => {
                toast.success("Email Sent!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            },
        }
    );
    const { mutate: sendText } = api.booking.sendTextConfirmation.useMutation({
        onSuccess: () => {
            toast.success("Text Sent!", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        },
    });

    const deleteBooking = () => {
        setShowDelete(false);
        if (session && session.user) {
            const data = {
                id: booking.id,
                userId: session.user.id,
            };
            mutate(data);

            const formattedDate = startDate.toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            if (emailSelect && user && user.firstName && user.lastName) {
                const emailData = {
                    userEmail: user.email as string,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    startDate,
                    displayDate: formattedDate,
                    type,
                    classification: "delete",
                };
                sendEmail(emailData);
            }
            if (
                textSelect &&
                user &&
                user.firstName &&
                user.lastName &&
                user.phoneNumber
            ) {
                const textData = {
                    phoneNumber: `+1${user.phoneNumber}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    displayDate: formattedDate,
                    startDate,
                    type,
                    classification: "delete",
                };
                sendText(textData);
            }
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <div className="flex flex-col gap-2 rounded-2xl bg-darkGlass p-5 text-2xl text-white shadow-xl">
            <div className="rounded-2xl bg-darkGlass px-4 py-2  shadow-lg">
                {format(startDate, "E, MMM do, y")}
            </div>
            <div className=" flex justify-center text-xl text-violet-400">
                {format(startDate, "paa")} to {format(endDate, "paa")}
            </div>
            <div className="text-xl">
                Status: <span className="text-violet-400">{status}</span>
            </div>
            {type.split(", ").map((el, i) => (
                <div
                    key={i}
                    className="rounded-2xl bg-darkGlass px-4 py-2  shadow-lg"
                >
                    {el}
                </div>
            ))}
            <div className="mt-5 flex justify-center gap-5 text-lg font-bold">
                {!showDelete && (
                    <>
                        <motion.button
                            onClick={openModal}
                            className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-400 shadow-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Edit
                        </motion.button>
                        <motion.button
                            onClick={() => setShowDelete(true)}
                            className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-400 shadow-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Delete
                        </motion.button>
                    </>
                )}

                {showDelete && (
                    <div className="flex flex-col">
                        {user && user.phoneNumber !== null && (
                            <div className="my-5 flex gap-5 text-sm">
                                <button
                                    className={`rounded-lg ${
                                        textSelect
                                            ? "bg-violet-300"
                                            : "bg-darkGlass"
                                    } px-4 py-2 `}
                                    onClick={() => setTextSelect(!textSelect)}
                                >
                                    Text Confirmation
                                </button>
                                <button
                                    className={`rounded-lg ${
                                        emailSelect
                                            ? "bg-violet-300"
                                            : "bg-darkGlass"
                                    } px-4 py-2 `}
                                    onClick={() => setEmailSelect(!emailSelect)}
                                >
                                    Email Confirmation
                                </button>
                            </div>
                        )}
                        <div className="flex justify-center gap-5">
                            <motion.button
                                className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-300 shadow-md"
                                onClick={deleteBooking}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Delete 🫡
                            </motion.button>
                            <motion.button
                                className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-300 shadow-md"
                                onClick={() => setShowDelete(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
            {session && (
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <AdminUpdateBooking
                        booking={booking}
                        closeModal={closeModal}
                    />
                </ModalDialog>
            )}
        </div>
    );
}
