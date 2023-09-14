import { api } from "~/utils/api";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSession } from "next-auth/react";
import { addMinutes } from "date-fns";
import TimeSlotPicker from "../Create/TimeSlotPicker";
import type { Matcher } from "react-day-picker";
import type {
    SpecificationsType,
    SelectionsType,
} from "~/components/NewBookingForm/Specifications";
import { useMobile } from "~/components/MobileContext";
import type { Booking } from "@prisma/client";
import type { NormalizedServicesType } from "~/server/api/routers/service";
import ServiceSelector from "./ServiceSelector";

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

const createCalendarOptions = (): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const disabled = [
        { from: startOfMonth, to: yesterday },
        { dayOfWeek: [0, 6] },
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

type BookingOptionType = Exclude<SelectionsType, "Quiet">;

const calculateService = (
    serviceStr: string,
    serviceData: NormalizedServicesType
) => {
    const services = serviceStr.split(", ");
    const currDetails = {
        totalPrice: 0,
        totalTime: 0,
        services: serviceStr,
    };

    services.forEach((el) => {
        const [main, sub] = el.split(": ");

        if (main) {
            serviceData[main]?.subcategories.forEach((obj) => {
                if (obj.name === sub) {
                    if (currDetails.totalTime) {
                        currDetails.totalTime += obj.bundleTime;
                        currDetails.totalPrice += obj.price;
                    } else {
                        currDetails.totalTime += obj.time;
                        currDetails.totalPrice += obj.price;
                    }
                }
            });
        }
    });

    return currDetails;
};

export default function UpdateBooking({
    booking,
    serviceData,
}: {
    booking: Booking;
    serviceData: NormalizedServicesType;
}) {
    const { isMobile } = useMobile();

    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [details, setDetails] = useState({
        totalPrice: 0,
        totalTime: 0,
        services: "",
    });

    let { data: futureBookings } = api.booking.getFuture.useQuery();
    if (!futureBookings) futureBookings = [];

    const ctx = api.useContext();

    const { mutate } = api.booking.update.useMutation({
        onSuccess: () => {
            void ctx.booking.getFuture.invalidate();
        },
    });

    const checkConflicts = () => {
        if (!date) return true;

        // if (date && check && isEqual(check.startDate, date)) return true;
        if (!timeSlot) return true;
        return false;
    };

    const updateBooking = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            id: booking.id,
            startDate: timeSlot ?? booking.startDate,
            endDate: addMinutes(
                timeSlot ?? booking.startDate,
                details.totalTime
            ),
            type: details.services,
        };

        setDate(undefined);

        return mutate(data);
    };

    useEffect(() => {
        setDetails(calculateService(booking.type, serviceData ?? {}));
    }, [booking, serviceData]);

    return isMobile ? (
        <div className="flex flex-col items-center justify-center gap-10 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-5 font-quattrocento shadow-lg">
            <ServiceSelector serviceData={serviceData} />
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg bg-gradient-to-br from-fuchsia-100 to-blue-200 text-purple-500 shadow-2xl "
                {...createCalendarOptions()}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    details={details}
                    bookedDates={futureBookings.filter(
                        (el) => el.id !== booking.id
                    )}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
                <button // TODO: remove this with button refactor
                    disabled={checkConflicts()}
                    className="mt-4 rounded-lg bg-violet-300 px-4 py-2 text-white transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-violet-300 disabled:bg-violet-200 disabled:text-slate-200"
                    onClick={updateBooking}
                >
                    Book now!
                </button>
            </div>
        </div>
    ) : (
        <div className="flex flex-col gap-10 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-10 font-quattrocento shadow-lg">
            <ServiceSelector serviceData={serviceData} />
            <div className="flex items-center justify-center">
                <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={(e) => {
                        setDate(e);
                    }}
                    className="rounded-lg bg-gradient-to-br from-fuchsia-100 to-blue-200 text-2xl text-purple-500 shadow-2xl"
                    {...createCalendarOptions()}
                />
                <div className="flex w-60 flex-col">
                    <TimeSlotPicker
                        date={date}
                        details={details}
                        bookedDates={futureBookings.filter(
                            (el) => el.id !== booking.id
                        )}
                        timeSlot={timeSlot}
                        setTimeSlot={setTimeSlot}
                    />
                    <button // TODO: remove this with button refactor
                        disabled={checkConflicts()}
                        className="mt-4 rounded-lg bg-violet-300 px-4 py-2 text-white transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-violet-300 disabled:bg-violet-200 disabled:text-slate-200"
                        onClick={updateBooking}
                    >
                        Book now!
                    </button>
                </div>
            </div>
        </div>
    );
}
