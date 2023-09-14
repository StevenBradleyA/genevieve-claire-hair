import { api } from "~/utils/api";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSession } from "next-auth/react";
import { addMinutes } from "date-fns";
import TimeSlotPicker from "./TimeSlotPicker";
import type { Matcher } from "react-day-picker";
import type {
    SpecificationsType,
    SelectionsType,
} from "~/components/NewBookingForm/Specifications";
import { useMobile } from "~/components/MobileContext";
import type { NormalizedServicesType } from "~/server/api/routers/service";

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

type BookingOptionType = Exclude<SelectionsType, "Quiet">;

export default function CreateBooking({
    serviceData,
}: {
    serviceData: NormalizedServicesType | undefined;
}) {
    const { data: session } = useSession();
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

    useEffect(() => {
        const storage = localStorage.getItem("Specifications");

        if (storage && serviceData) {
            const specifications = JSON.parse(storage) as SpecificationsType;

            const bookingDetails = {
                totalPrice: 0,
                totalTime: 0,
                services: "",
            };

            for (const service in specifications) {
                const subService = specifications[service as BookingOptionType];

                if (subService) {
                    if (bookingDetails.services) {
                        bookingDetails.services += `, ${service}: ${subService}`;
                    } else {
                        bookingDetails.services += `${service}: ${subService}`;
                    }
                }

                const currentCategories =
                    serviceData[service]?.subcategories ?? [];

                for (const subcat of currentCategories) {
                    if (subcat.name === subService) {
                        if (bookingDetails.totalTime) {
                            bookingDetails.totalTime += subcat.bundleTime;
                            bookingDetails.totalPrice += subcat.price;
                        } else {
                            bookingDetails.totalTime += subcat.time;
                            bookingDetails.totalPrice += subcat.price;
                        }
                    }
                }
            }
            setDetails(bookingDetails);
        }
    }, [serviceData]);

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
            void ctx.booking.getFuture.invalidate();
            localStorage.removeItem("Services");
            localStorage.removeItem("Specifications");
        },
    });

    return isMobile ? (
        <div className="flex flex-col items-center justify-center gap-10 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-5 font-quattrocento shadow-lg">
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg bg-gradient-to-br from-fuchsia-100 to-blue-200 text-purple-500 shadow-2xl "
                {...createCalendarOptions(futureBookings)}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    details={details}
                    bookedDates={futureBookings}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
                <button // TODO: remove this with button refactor
                    disabled={checkConflicts()}
                    className="mt-4 rounded-lg bg-violet-300 px-4 py-2 text-white transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-violet-300 disabled:bg-violet-200 disabled:text-slate-200"
                    onClick={book}
                >
                    Book now!
                </button>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-10 font-quattrocento shadow-lg">
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg bg-gradient-to-br from-fuchsia-100 to-blue-200 text-purple-500 shadow-2xl "
                {...createCalendarOptions(futureBookings)}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    details={details}
                    bookedDates={futureBookings}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
                <button // TODO: remove this with button refactor
                    disabled={checkConflicts()}
                    className="mt-4 rounded-lg bg-violet-300 px-4 py-2 text-white transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-violet-300 disabled:bg-violet-200 disabled:text-slate-200"
                    onClick={book}
                >
                    Book now!
                </button>
            </div>
        </div>
    );
}
