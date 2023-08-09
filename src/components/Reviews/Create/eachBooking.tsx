import type { Booking } from "@prisma/client";
import { useState } from "react";
import CreateReview from ".";

interface EachBookingProps {
    closeModal: () => void;
    isSelected: boolean;
    toggleBooking: () => void;
}

export default function EachBookingCard({
    booking,
    closeModal,
    isSelected,
    toggleBooking,
}: {
    booking: Booking;
} & EachBookingProps) {
    const inputDate = new Date(booking.date);

    const year = inputDate.toLocaleDateString(undefined, { year: "numeric" });
    const month = inputDate.toLocaleDateString(undefined, { month: "long" });

    return (
        <>
            {isSelected ? (
                <CreateReview bookingId={booking.id} closeModal={closeModal} />
            ) : (
                <button
                    className="flex w-96 justify-between bg-glass text-white"
                    onClick={toggleBooking}
                >
                    <div>{booking.type}</div>
                    <div className="opacity-50">{`${month}, ${year}`}</div>
                </button>
            )}
        </>
    );
}
