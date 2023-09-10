import { useSession } from "next-auth/react";
import { useState } from "react";
import { format } from "date-fns";
import type { Booking } from "@prisma/client";
import UpdateBooking from "../Update";
import DeleteBooking from "../Delete";
import ModalDialog from "~/components/Modal";

export default function BookingCard({ booking }: { booking: Booking }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { startDate, endDate, type, status } = booking;

    // TODO: Refactor update & delete to work as modals

    return (
        <div className="rounded-2xl bg-glass p-5 text-4xl text-white shadow-lg">
            <div>{format(startDate, "E, MMM do, y")}</div>
            <div>
                {format(startDate, "paa")} to {format(endDate, "paa")}
            </div>
            <div>{type}</div>
            <div>{status}</div>
            <div className="mt-5 flex gap-5 text-5xl font-bold">
                <button
                    onClick={openModal}
                    className="rounded-full bg-glass p-2 px-3 text-3xl shadow-sm"
                >
                    🧐
                </button>
            </div>
            {session && (
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <>
                        {!showDelete && (
                            <UpdateBooking
                                booking={booking}
                                session={session}
                                showUpdate={showUpdate}
                                setShowUpdate={setShowUpdate}
                            />
                        )}

                        {!showUpdate && (
                            <DeleteBooking
                                id={booking.id}
                                session={session}
                                showDelete={showDelete}
                                setShowDelete={setShowDelete}
                            />
                        )}
                    </>
                </ModalDialog>
            )}
        </div>
    );
}
