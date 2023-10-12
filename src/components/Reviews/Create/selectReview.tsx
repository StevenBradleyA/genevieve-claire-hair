import { useSession } from "next-auth/react";
import type { Booking } from "@prisma/client";
import EachBookingCard from "./eachBooking";
import { useState } from "react";
import { DotLoader } from "react-spinners";
import { useMobile } from "~/components/MobileContext";

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
    const { isMobile } = useMobile();

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

    return isMobile ? (
        <div className="flex flex-col items-center">
            {selectedBooking ? null : (
                <div className="mb-5 text-lg text-white">
                    Select a Service to Review
                </div>
            )}

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
    ) : (
        <div className="flex flex-col items-center">
            {selectedBooking ? null : (
                <div className="mb-10 text-lg text-white">
                    Select a Service to Review
                </div>
            )}
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
