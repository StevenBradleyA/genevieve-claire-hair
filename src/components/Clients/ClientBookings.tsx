import { DotLoader } from "react-spinners";
import { api } from "~/utils/api";
import BookingCard from "../Bookings/Display/BookingCard";

export default function ClientBookings({ userId }: { userId: string }) {
    const { data, isLoading } = api.booking.getByUserId.useQuery(userId);
    const { data: serviceData } = api.service.getAllNormalized.useQuery();

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Loading User</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!serviceData)
        return <DotLoader size={50} color={"#ffffff"} loading={serviceData} />;

    if (!data) return <div>Oops</div>;

    return (
        <div className="mb-20 flex flex-wrap items-center justify-center gap-10 text-white">
            {data.map((booking) => (
                <BookingCard
                    key={booking.id}
                    booking={booking}
                    serviceData={serviceData}
                />
            ))}
        </div>
    );
}
