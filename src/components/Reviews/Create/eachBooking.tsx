import type { Booking } from "@prisma/client";



export default function EachBookingCard({ booking }: { booking: Booking }) {
    return (
        <>
            <div>
                {booking.type}
            </div>
        </>
    );
}
