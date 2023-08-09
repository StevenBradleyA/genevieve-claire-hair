import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import type { Booking } from "@prisma/client";
import EachBookingCard from "./eachBooking";



export default function SelectReview() {
    // want to list all bookings that don't have a review
    const { data: session } = useSession();
    if (!session) return <div>Please login to see bookings</div>;

    const { data: bookings, isLoading } = api.booking.getAllByUserIdWithNoReview.useQuery(
        session.user.id
    );

    if (isLoading) return <div>Loading All Reviews...</div>;

    if (!bookings) return <div>Oops</div>;

    return (
        <>
            <div>which service are you reviewing? </div>
            <div></div>
            {bookings.map((booking: Booking, i: number) => {
                return <EachBookingCard key={i} booking={booking} />;
            })}
        </>
    );
}
