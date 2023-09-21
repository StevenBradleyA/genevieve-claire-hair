import AdminLayout from "../layout";
import { api } from "~/utils/api";
import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "~/pages/_app";
import BookingCard from "~/components/Bookings/Display/BookingCard";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";
import type { Matcher } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import TimeSlotPicker from "~/components/Bookings/Create/TimeSlotPicker";

export interface CalendarOptions {
    disabled: Matcher[];
    fromYear: number;
    fromMonth: Date;
    modifiers: {
        booked: Date[];
    };
    modifiersStyles: {
        booked: {
            color: string;
            fontWeight: string;
            textDecoration: string;
        };
    };
    fixedWeeks: boolean;
    showOutsideDays: boolean;
}

export type BookedDateType = {
    startDate: Date;
    endDate: Date;
};

export type BookingDetailsType = {
    totalPrice: number;
    totalTime: number;
    services: string;
};

const createCalendarOptions = (booked: BookedDateType[]): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const disabled = [
        // ...booked,
        { from: startOfMonth, to: yesterday },
        { dayOfWeek: [0, 6] },
    ];

    const options = {
        disabled,
        fromYear: today.getFullYear(),
        fromMonth: today,
        // modifiers: { booked },
        modifiers: { booked: [] },
        modifiersStyles: {
            booked: {
                color: "red",
                fontWeight: "bolder",
                textDecoration: "line-through",
            },
        },
        fixedWeeks: true,
        showOutsideDays: true,
    };

    return options;
};

const AdminViewBookings: NextPageWithLayout = () => {
    // const [view, setView] = useState("future");
    const [isFuture, setIsFuture] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [details, setDetails] = useState({
        totalPrice: 0,
        totalTime: 0,
        services: "",
    });

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

    const checkConflicts = () => {
        if (!date) return true;

        // if (date && check && isEqual(check.startDate, date)) return true;
        if (!timeSlot) return true;
        return false;
    };
 
    

    return (
        <div className=" mb-20 flex w-3/4 flex-col items-center rounded-2xl bg-glass px-10 pb-10 text-white shadow-2xl">
            <div> Calendar that shows schedule </div>
            <div className="mb-10">
                {" "}
                Ability to change calendar availability
            </div>

            <div className="flex items-center justify-center gap-10 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-10 font-quattrocento shadow-lg">
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg bg-gradient-to-br from-fuchsia-100 to-blue-200 text-purple-500 shadow-2xl "
                {...createCalendarOptions(future)}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    details={details}
                    bookedDates={future}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
                <button 
                    disabled={checkConflicts()}
                    className="mt-4 rounded-lg bg-violet-300 px-4 py-2 text-white transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-violet-300 disabled:bg-violet-200 disabled:text-slate-200"
                    
                >
                    Book now!
                </button>
            </div>
            </div>

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
