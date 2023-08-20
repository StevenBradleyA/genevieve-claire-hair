import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import type { Booking } from "@prisma/client";
import EachBookingCard from "./eachBooking";
import { useState } from "react";
import { DotLoader } from "react-spinners";

interface SelectReviewProps {
    closeModal: () => void;
    bookings: Booking[];
    isLoading: boolean;
}

export default function SelectService({
    closeModal,
    bookings,
    isLoading,
}: SelectReviewProps) {
    const { data: session } = useSession();

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
        null
    );

    if (!session) return <div>Please login to see bookings</div>;

    if (!bookings) return <div>You have no bookings to review </div>;

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Reviews are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

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
