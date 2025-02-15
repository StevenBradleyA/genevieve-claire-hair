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
import { DotLoader } from "react-spinners";
import type { DaysType, ScheduleType } from "~/server/api/routers/schedule";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import type { RouterOutputs } from "~/utils/api";

export type TimeOffType = RouterOutputs["schedule"]["getTimeOff"];
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

const createCalendarOptions = (
    schedule: ScheduleType,
    timeOff: TimeOffType["full"]
): CalendarOptions => {
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
        ...timeOff.map(({ startDate: from, endDate: to }) => ({ from, to })),
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

export default function CreateBooking({
    serviceData,
}: {
    serviceData: NormalizedServicesType | undefined;
}) {
    const { data: session } = useSession();
    const { isMobile } = useMobile();
    const router = useRouter();

    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [details, setDetails] = useState({
        totalPrice: 0,
        totalTime: 0,
        services: "",
    });
    const [textSelect, setTextSelect] = useState<boolean>(false);
    const [emailSelect, setEmailSelect] = useState<boolean>(true);

    const { data: futureBookings } = api.booking.getFuture.useQuery();
    const { data: schedule } = api.schedule.getNormalizedDays.useQuery();
    const { data: timeOff } = api.schedule.getTimeOff.useQuery();

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
        if (!timeSlot) return true;
        return false;
    };

    const book = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id && date) {
            const user = session.user;
            const startDate = timeSlot ?? date;
            const type = details.services;
            const data = {
                startDate,
                endDate: addMinutes(timeSlot ?? date, details.totalTime),
                type,
                userId: session.user.id,
                price: details.totalPrice,
            };

            setDate(undefined);
            mutate(data);

            const formattedDate = startDate.toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            if (emailSelect) {
                const emailData = {
                    userEmail: user.email as string,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    startDate,
                    displayDate: formattedDate,
                    type,
                    classification: "create",
                };
                sendEmail(emailData);
            }

            if (textSelect) {
                const textData = {
                    phoneNumber: `+1${user.phoneNumber}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    displayDate: formattedDate,
                    startDate,
                    type,
                    classification: "create",
                };
                sendText(textData);
            }
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
            toast.success("Booking Confirmed!", {
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#d8b4fe",
                },
            });
            void router.push("/bookings/confirmed");
        },
    });

    const { mutate: sendEmail } = api.booking.sendEmailConfirmation.useMutation(
        {
            onSuccess: () => {
                toast.success("Email Sent!", {
                    style: {
                        borderRadius: "10px",
                        background: "#ffffff",
                        color: "#d8b4fe",
                    },
                });
            },
        }
    );
    const { mutate: sendText } = api.booking.sendTextConfirmation.useMutation({
        onSuccess: () => {
            toast.success("Text Sent!", {
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#d8b4fe",
                },
            });
        },
    });

    if (!futureBookings || !schedule || !timeOff)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Loading Schedule</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={true} />
            </div>
        );

    return isMobile ? (
        <div className="flex flex-col items-center justify-center gap-10 rounded-2xl bg-darkGlass p-5 shadow-lg">
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg bg-darkGlass text-white shadow-2xl "
                {...createCalendarOptions(schedule, timeOff.full)}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    details={details}
                    schedule={schedule}
                    bookedDates={[...futureBookings, ...timeOff.partial]}
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
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-darkGlass p-10 text-white shadow-lg">
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg bg-darkGlass shadow-2xl "
                {...createCalendarOptions(schedule, timeOff.full)}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    details={details}
                    schedule={schedule}
                    bookedDates={[...futureBookings, ...timeOff.partial]}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
                {session?.user.phoneNumber !== null && (
                    <div className="my-5 flex gap-5 text-sm">
                        <button
                            className={`rounded-lg ${
                                textSelect ? "bg-violet-300" : "bg-darkGlass"
                            } px-4 py-2 `}
                            onClick={() => setTextSelect(!textSelect)}
                        >
                            Text Confirmation
                        </button>
                        <button
                            className={`rounded-lg ${
                                emailSelect ? "bg-violet-300" : "bg-darkGlass"
                            } px-4 py-2 `}
                            onClick={() => setEmailSelect(!emailSelect)}
                        >
                            Email Confirmation
                        </button>
                    </div>
                )}

                <button // TODO: remove this with button refactor
                    disabled={checkConflicts()}
                    className="mt-4 rounded-lg bg-violet-300 px-4 py-2 transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-violet-300 disabled:bg-violet-200 disabled:text-slate-200"
                    onClick={book}
                >
                    Book now!
                </button>
            </div>
        </div>
    );
}
