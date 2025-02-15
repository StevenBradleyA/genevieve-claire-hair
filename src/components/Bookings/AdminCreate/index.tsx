import { useEffect, useState } from "react";
import AdminBookingSelectService from "./selectService";
import { api } from "~/utils/api";
import { DotLoader } from "react-spinners";
import AdminCalendar from "./AdminCalendar";
import PriceTimeAdjust from "./PriceTimeAdjust";
import { addMinutes } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import type { User } from "@prisma/client";

interface AdminCreateBookingProps {
    user: User;
}

export default function AdminCreateBooking({ user }: AdminCreateBookingProps) {
    // TODO CUSTOM TIME SELECTION -- KEEPS TRACK OF OTHER BOOKINGS BUT DOESNT HAVE SCHEDULE TIME CONSTRAINTS
    // TODO have default service times as well as custom????
    // todo show calendar and normal booking stuffs
    // todo error handling for selecting a service

    const router = useRouter();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [originalPrice, setOriginalPrice] = useState(0);
    const [originalTime, setOriginalTime] = useState(0);
    const [customPrice, setCustomPrice] = useState(0);
    const [customTime, setCustomTime] = useState(0);
    const [textSelect, setTextSelect] = useState<boolean>(false);
    const [emailSelect, setEmailSelect] = useState<boolean>(true);

    const ctx = api.useContext();
    const { data: futureBookings } = api.booking.getFuture.useQuery();
    const { data: serviceData } = api.service.getAllNormalized.useQuery();
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

    const checkConflicts = () => {
        if (!date) return true;
        if (!timeSlot) return true;
        if (!selectedServices.length) return true;
        return false;
    };

    const book = (e: React.FormEvent) => {
        e.preventDefault();

        if (date) {
            const startDate = timeSlot ?? date;
            const type = selectedServices.join(", ");
            const data = {
                startDate,
                endDate: addMinutes(timeSlot ?? date, customTime),
                type,
                userId: user.id,
                price: customPrice,
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

            if (emailSelect && user.firstName && user.lastName) {
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

            if (
                textSelect &&
                user.firstName &&
                user.lastName &&
                user.phoneNumber
            ) {
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

    useEffect(() => {
        // TODO: Refactor with Geni's weighted services

        let currPrice = 0;
        let currTime = 0;
        if (serviceData) {
            for (const service of selectedServices) {
                const [main, sub] = service.split(": ");

                if (main && sub) {
                    if (serviceData[main]?.price) {
                        currPrice += serviceData[main]?.price as number;
                    } else {
                        const subCats = serviceData[main]?.subcategories;

                        if (subCats) {
                            const currSub = subCats.find(
                                (el) => el.name === sub
                            );

                            if (currSub) {
                                currPrice += currSub.price;
                                currTime += currSub.time;
                            }
                        }
                    }
                }
            }
        }

        setOriginalPrice(currPrice);
        setOriginalTime(currTime);
        setCustomPrice(currPrice);
        setCustomTime(currTime);
    }, [serviceData, selectedServices]);

    if (!futureBookings)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={true} />
            </div>
        );

    return (
        <div className="flex flex-col items-center justify-center text-xl">
            {user && user.firstName && user.lastName && (
                <div className="mb-3 text-5xl">
                    {`${user.firstName} ${user.lastName}`}
                </div>
            )}
            <AdminBookingSelectService
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
            />

            <PriceTimeAdjust
                originalPrice={originalPrice}
                originalTime={originalTime}
                customPrice={customPrice}
                customTime={customTime}
                setCustomPrice={setCustomPrice}
                setCustomTime={setCustomTime}
            />

            <AdminCalendar
                date={date}
                setDate={setDate}
                timeSlot={timeSlot}
                setTimeSlot={setTimeSlot}
                totalTime={customTime}
                bookedDates={futureBookings}
            />
            {user.phoneNumber !== null && (
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
            <button
                disabled={checkConflicts()}
                className="mt-4 rounded-lg bg-violet-300 px-4 py-2 transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-violet-300 disabled:bg-violet-200 disabled:text-slate-200"
                onClick={book}
            >
                Book now!
            </button>
        </div>
    );
}
