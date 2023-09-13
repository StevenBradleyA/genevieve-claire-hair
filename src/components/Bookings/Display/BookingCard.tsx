import { useSession } from "next-auth/react";
import { useState } from "react";
import { format } from "date-fns";
import type { Booking } from "@prisma/client";
import UpdateBooking from "../Update";
import ModalDialog from "~/components/Modal";
import { api } from "~/utils/api";
import type { NormalizedServicesType } from "~/server/api/routers/service";

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
        <div className="rounded-2xl bg-glass p-5 text-4xl text-white shadow-lg">
            <div>{format(startDate, "E, MMM do, y")}</div>
            <div>
                {format(startDate, "paa")} to {format(endDate, "paa")}
            </div>
            <div>Status: {status}</div>
            {type.split(", ").map((el, i) => (
                <div key={i}>{el}</div>
            ))}
            <div className="mt-5 flex justify-between gap-5 text-5xl font-bold">
                {!showDelete && (
                    <>
                        <button
                            onClick={openModal}
                            className="rounded-full bg-glass p-2 px-3 text-3xl shadow-sm"
                        >
                            📝
                        </button>
                        <button
                            onClick={() => setShowDelete(true)}
                            className="rounded-full bg-glass p-2 px-3 text-3xl shadow-sm"
                        >
                            🗑️
                        </button>
                    </>
                )}

                {showDelete && (
                    <>
                        <button
                            className="rounded-full bg-glass p-2 px-3 text-3xl shadow-sm"
                            onClick={deleteBooking}
                        >
                            🔥
                        </button>
                        <button
                            className="rounded-full bg-glass p-2 px-3 text-3xl shadow-sm"
                            onClick={() => setShowDelete(false)}
                        >
                            ❎
                        </button>
                    </>
                )}
            </div>
            {session && (
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <UpdateBooking
                        booking={booking}
                        serviceData={serviceData}
                    />
                </ModalDialog>
            )}
        </div>
    );
}
