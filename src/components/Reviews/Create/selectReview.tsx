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

    return (
        <div
            className={`flex h-[500px] ${
                isMobile ? "w-[250px]" : "w-[450px]"
            } flex-col items-center`}
        >
            {selectedBooking ? (
                <div className=" flex flex-col items-center text-3xl text-white laptop:text-5xl">
                    <h1 className="font-grandHotel">Leave a Review</h1>
                    <div className="rounded-full bg-white p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-purple-300 "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className=" flex flex-col items-center text-2xl text-white laptop:text-5xl">
                    <h1 className="font-grandHotel">
                        Select a Service to Review
                    </h1>

                    <div className="rounded-full bg-white p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-purple-300 "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            )}
            {bookings ? (
                <div className="mt-5 flex h-[400px] w-full flex-col gap-5 overflow-y-auto rounded-3xl bg-white p-5">
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
                <div className="mt-5 text-purple-300">
                    No services to review
                </div>
            )}
        </div>
    );
}
