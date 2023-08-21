import { api } from "~/utils/api";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSession } from "next-auth/react";
import { addMinutes, isEqual } from "date-fns";
import TimeSlotPicker from "./TimeSlotPicker";
import { allServices } from "~/utils/services";
import type { Matcher } from "react-day-picker";
import type {
    SpecificationsType,
    SelectionsType,
} from "~/components/NewBookingForm/Specifications";

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

    console.log(booked);

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

type BookingOptionType = Exclude<SelectionsType, "Quiet">;

export default function CreateBooking() {
    const { data: session } = useSession();
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [details, setDetails] = useState({
        totalPrice: 0,
        totalTime: 0,
        services: "",
    });
    let { data: pfBangs } = api.booking.getPresentFutureBookings.useQuery();

    if (!pfBangs) pfBangs = [];
    const { data: check } = api.booking.getByDate.useQuery(date);

    useEffect(() => {
        const storage = localStorage.getItem("Specifications");

        if (storage) {
            const specifications = JSON.parse(storage) as SpecificationsType;

            const bookingDetails = {
                totalPrice: 0,
                totalTime: 0,
                services: "",
            };

            for (const service in specifications) {
                const subService = specifications[service as BookingOptionType];
                // if (subService && service !== "ready" && service !== "Quiet") {
                if (subService && service !== "ready") {
                    if (bookingDetails.services) {
                        bookingDetails.services += `, ${service}: ${subService}`;
                    } else {
                        bookingDetails.services += `${service}: ${subService}`;
                    }

                    if (subService && service !== "Quiet") {
                        const currentService =
                            allServices[service as BookingOptionType][
                                subService
                            ];
                        if (bookingDetails.totalTime) {
                            bookingDetails.totalPrice +=
                                currentService?.bundleTime || 0;
                            bookingDetails.totalPrice +=
                                currentService?.price || 0;
                        } else {
                            bookingDetails.totalTime +=
                                currentService?.time || 0;
                            bookingDetails.totalPrice +=
                                currentService?.price || 0;
                        }
                    }
                }
            }
            console.log(bookingDetails);
            setDetails(bookingDetails);
        }
    }, []);

    const checkConflicts = () => {
        if (!date) return true;

        // if (date && check && isEqual(check.startDate, date)) return true;
        if (!timeSlot) return true;
        return false;
    };

    const book = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id && date) {
            const data = {
                startDate: timeSlot ?? date,
                endDate: addMinutes(timeSlot ?? date, details.totalTime),
                type: details.services,
                userId: session.user.id,
            };

            setDate(undefined);

            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    const ctx = api.useContext();

    const { mutate } = api.booking.create.useMutation({
        onSuccess: () => {
            void ctx.booking.getPresentFutureBookings.invalidate();
            localStorage.removeItem("Services");
            localStorage.removeItem("Specifications");
        },
    });

    return (
        <div
            onSubmit={book}
            className="flex items-center justify-center px-4 py-16 font-quattrocento"
        >
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg  bg-white p-1 shadow-2xl"
                {...createCalendarOptions(pfBangs)}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    details={details}
                    bookedDates={pfBangs}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
                <button // TODO: remove this with button refactor
                    disabled={checkConflicts()}
                    onClick={book}
                    className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
                >
                    Book now!
                </button>
            </div>
        </div>
    );
}
