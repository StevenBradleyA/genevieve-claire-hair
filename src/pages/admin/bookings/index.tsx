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
import ModalDialog from "~/components/Modal";
import type { Schedule } from "@prisma/client";
import EachSchedule from "~/components/Bookings/Schedule";
import type { DaysType, ScheduleType } from "~/server/api/routers/schedule";
import AdminBookingSelectUser from "~/components/Bookings/AdminCreate/userSelect";

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

const createCalendarOptions = (schedule: ScheduleType): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const disabled = [
        { from: startOfMonth, to: yesterday },
        {
            dayOfWeek: Object.keys(schedule)
                .filter(
                    (el) =>
                        !schedule[Number(el) as DaysType].startTime ||
                        !schedule[Number(el) as DaysType].endTime
                )
                .map((el) => Number(el)),
        },
    ];

    const options = {
        disabled,
        fromYear: today.getFullYear(),
        fromMonth: today,
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
    const { data: future, isLoading: futureLoading } =
        api.booking.getFuture.useQuery();
    const { data: past, isLoading: pastLoading } =
        api.booking.getPast.useQuery();
    const { data: serviceData } = api.service.getAllNormalized.useQuery();

    const { data: scheduleData, isLoading: scheduleDataLoading } =
        api.schedule.getAllDays.useQuery();

    const { data: fullSchedule } = api.schedule.getNormalizedDays.useQuery();

    const [isFuture, setIsFuture] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [details, setDetails] = useState({
        totalPrice: 0,
        totalTime: 0,
        services: "",
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isBookingModalOpen, setIsBookingModalOpen] =
        useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (pastLoading)
        return <DotLoader size={50} color={"#ffffff"} loading={pastLoading} />;

    if (futureLoading)
        return (
            <DotLoader size={50} color={"#ffffff"} loading={futureLoading} />
        );
    if (scheduleDataLoading)
        return (
            <DotLoader size={50} color={"#ffffff"} loading={futureLoading} />
        );

    if (!serviceData)
        return <DotLoader size={50} color={"#ffffff"} loading={serviceData} />;

    if (!future || !fullSchedule)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Loading Schedule</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={true} />
            </div>
        );

    const toggleSwitch = () => setIsFuture(!isFuture);
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };

    const openBookingModal = () => {
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
    };
    //    TODO Allow ability to approve pending appointments

    return (
        <div className=" mb-20 flex w-3/4 flex-col items-center rounded-2xl bg-glass p-10  text-white shadow-2xl">
            <div className="mb-5 text-5xl font-bold">Schedule</div>
            <div>this will show all appointments for the day selected</div>
            <div className="flex items-center justify-center gap-10 rounded-2xl bg-darkGlass p-10 shadow-lg">
                <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={(e) => {
                        setDate(e);
                    }}
                    className="rounded-lg bg-darkGlass shadow-2xl "
                    {...createCalendarOptions(fullSchedule)}
                />
                <div className="flex w-60 flex-col">
                    <TimeSlotPicker
                        date={date}
                        details={details}
                        schedule={fullSchedule}
                        bookedDates={future}
                        timeSlot={timeSlot}
                        setTimeSlot={setTimeSlot}
                    />
                </div>
            </div>

            <motion.button
                className="mt-10 rounded-3xl bg-darkGlass px-6 py-2 text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={openBookingModal}
            >
                Book an Appointment
            </motion.button>
            <ModalDialog
                isOpen={isBookingModalOpen}
                onClose={closeBookingModal}
            >
                <AdminBookingSelectUser closeModal={closeBookingModal} />
            </ModalDialog>

            <div className="mt-20 flex items-center gap-5 text-5xl font-bold">
                <div className="">Past</div>

                <div
                    className="switch w-28 p-2"
                    data-isfuture={isFuture}
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
            {scheduleData && (
                <div className="mb-10 mt-10 flex flex-col gap-10">
                    <button
                        onClick={openModal}
                        className="inline-block h-12 transform cursor-pointer select-none appearance-none rounded-full bg-blue-200 px-6 text-xl text-white shadow-none transition-transform hover:scale-110 active:scale-105"
                    >
                        Change Schedule
                    </button>
                    <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                        <div>
                            {scheduleData.map(
                                (schedule: Schedule, i: number) => (
                                    <EachSchedule
                                        key={i}
                                        closeModal={closeModal}
                                        schedule={schedule}
                                    />
                                )
                            )}
                        </div>
                    </ModalDialog>
                </div>
            )}
        </div>
    );
};

AdminViewBookings.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminViewBookings;
