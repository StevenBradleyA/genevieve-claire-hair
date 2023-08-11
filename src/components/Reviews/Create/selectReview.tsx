import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import type { Booking } from "@prisma/client";
import EachBookingCard from "./eachBooking";
import { useState } from "react";

interface SelectReviewProps {
    closeModal: () => void;
}

export default function SelectReview({ closeModal }: SelectReviewProps) {
    const { data: session } = useSession();
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
        null
    );

    if (!session) return <div>Please login to see bookings</div>;

    const { data: bookings, isLoading } =
        api.booking.getAllByUserIdWithNoReview.useQuery(session.user.id);

    if (isLoading) return <div>Loading All Reviews...</div>;

    if (!bookings) return <div>You have no bookings to review </div>;

    const handleBookingClick = (booking: Booking) => {
        setSelectedBooking(booking);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-10 font-grand-hotel text-6xl text-white">
                Select a Service to Review{" "}
            </div>
            {bookings ? (
                <div className="flex flex-col gap-5">
                    {selectedBooking ? (
                        <EachBookingCard
                            booking={selectedBooking}
                            closeModal={closeModal}
                            isSelected={true}
                            toggleBooking={() => setSelectedBooking(null)}
                        />
                    ) : (
                        bookings.map((booking: Booking, i: number) => (
                            <EachBookingCard
                                key={i}
                                booking={booking}
                                closeModal={closeModal}
                                isSelected={false}
                                toggleBooking={() =>
                                    handleBookingClick(booking)
                                }
                            />
                        ))
                    )}
                </div>
            ) : (
                <div>Hey Gurl, you have no services to review</div>
            )}
        </div>
    );
}
