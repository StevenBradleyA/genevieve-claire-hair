import AdminLayout from "../layout";
import { api } from "~/utils/api";
import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "~/pages/_app";
import BookingCard from "~/components/Bookings/Display/BookingCard";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";

const AdminViewBookings: NextPageWithLayout = () => {
    // const [view, setView] = useState("future");
    const [isFuture, setIsFuture] = useState<boolean>(false);

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

    const toggleSwitch = () => setIsFuture(!isFuture);
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };

    // TODO Want to refactor this to be a calendar so it is easier to visualize
    // lets have a calendar that shows all bookings for the selected day
    // Below the calendar lets keep this past and upcoming feature but restyle to be more readable

    return (
        <div className=" mb-20 flex w-3/4 flex-col items-center rounded-2xl bg-glass px-10 pb-10 text-white shadow-2xl">
            <div className="mb-96 mt-96">Calendar here</div>
            <div className="flex items-center gap-5 text-5xl font-bold">
                <div className="">Past</div>

                <div
                    className="switch w-28 p-2"
                    data-isFuture={isFuture}
                    onClick={toggleSwitch}
                >
                    <motion.div
                        className="handle h-10 w-10"
                        layout
                        transition={spring}
                    />
                </div>
                <div>Upcoming</div>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-10 rounded-lg border-white p-5">
                {isFuture &&
                    future &&
                    future.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            serviceData={serviceData}
                        />
                    ))}
                {!isFuture &&
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
