import { useSession } from "next-auth/react";
import { useState } from "react";
import { format } from "date-fns";
import type { Booking } from "@prisma/client";
import UpdateBooking from "../Update";
import ModalDialog from "~/components/Modal";
import { api } from "~/utils/api";
import type { NormalizedServicesType } from "~/server/api/routers/service";
import { motion } from "framer-motion";
import AdminUpdateBooking from "../AdminUpdate";

export default function BookingCard({
    booking,
    serviceData,
}: {
    booking: Booking;
    serviceData: NormalizedServicesType;
}) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            void ctx.booking.getByUserId.invalidate();
        },
    });

    const deleteBooking = () => {
        setShowDelete(false);
        if (session && session.user) {
            const data = {
                id: booking.id,
                userId: session.user.id,
            };
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    // TODO: Refactor update & delete to work as modals

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
                    <>
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
                    </>
                )}
            </div>
            {session && (
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <AdminUpdateBooking booking={booking} />
                </ModalDialog>
            )}
        </div>
    );
}
