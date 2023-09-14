import AdminLayout from "../layout";
import { api } from "~/utils/api";
import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "~/pages/_app";
import BookingCard from "~/components/Bookings/Display/BookingCard";
import { DotLoader } from "react-spinners";

const AdminViewBookings: NextPageWithLayout = () => {
    const [view, setView] = useState("future");
    const { data: future, isLoading: futureLoading } =
        api.booking.getFuture.useQuery();
    const { data: past, isLoading: pastLoading } =
        api.booking.getPast.useQuery();
    const { data: serviceData } = api.service.getAllNormalized.useQuery();

    if (pastLoading)
        return <DotLoader size={50} color={"#ffffff"} loading={pastLoading} />;

    if (futureLoading)
        return (
            <DotLoader size={50} color={"#ffffff"} loading={futureLoading} />
        );

    if (!serviceData)
        return <DotLoader size={50} color={"#ffffff"} loading={serviceData} />;

    return (
        <div className="flex w-full flex-col items-center rounded-2xl bg-glass px-10 pb-10 text-white shadow-2xl">
            <div className="flex w-full justify-around pt-5 text-5xl font-bold">
                <button
                    className={`rounded-t-xl px-5 py-2 ${
                        view === "past"
                            ? "border-x-2 border-t-2 border-white text-purple-300"
                            : ""
                    }`}
                    onClick={() => setView("past")}
                >
                    Past
                </button>
                <button
                    className={`rounded-t-xl px-5 py-2 ${
                        view === "future"
                            ? "border-x-2 border-t-2 border-white text-purple-300"
                            : ""
                    }`}
                    onClick={() => setView("future")}
                >
                    Upcoming
                </button>
            </div>
            <div className="flex w-full flex-wrap justify-around gap-5 rounded-lg border-2 border-white p-5">
                {view === "future" &&
                    future &&
                    future.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            serviceData={serviceData}
                        />
                    ))}
                {view === "past" &&
                    past &&
                    past.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            serviceData={serviceData}
                        />
                    ))}
            </div>
        </div>
    );
};

AdminViewBookings.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminViewBookings;
