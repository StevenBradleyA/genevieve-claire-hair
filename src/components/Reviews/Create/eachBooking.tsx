import CreateReview from ".";
interface EachBookingProps {
    closeModal: () => void;
    isSelected: boolean;
    toggleBooking: () => void;
}

interface Booking {
    id: string;
    type: string;
    startDate: Date;
}

export default function EachBookingCard({
    booking,
    closeModal,
    isSelected,
    toggleBooking,
}: {
    booking: Booking;
} & EachBookingProps) {
    const inputDate = new Date(booking.startDate);

    const year = inputDate.toLocaleDateString(undefined, { year: "numeric" });
    const month = inputDate.toLocaleDateString(undefined, { month: "long" });

    return (
        <>
            {isSelected ? (
                <CreateReview bookingId={booking.id} closeModal={closeModal} />
            ) : (
                <button
                    className="flex  w-full transform justify-between rounded-xl bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 p-3 px-4  py-2 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                    onClick={toggleBooking}
                >
                    <div>{booking.type}</div>
                    <div className="opacity-50">{`${month}, ${year}`}</div>
                </button>
            )}
        </>
    );
}
