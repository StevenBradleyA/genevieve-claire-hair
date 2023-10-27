import { useEffect, useState } from "react";
import AdminBookingSelectService from "../AdminCreate/selectService";
import { api } from "~/utils/api";
import { DotLoader } from "react-spinners";
import AdminCalendar from "../AdminCreate/AdminCalendar";
import PriceTimeAdjust from "../AdminCreate/PriceTimeAdjust";
import { addMinutes } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import type { Booking } from "@prisma/client";

export default function AdminUpdateBooking({ booking }: { booking: Booking }) {
    // TODO CUSTOM TIME SELECTION -- KEEPS TRACK OF OTHER BOOKINGS BUT DOESNT HAVE SCHEDULE TIME CONSTRAINTS
    // TODO have default service times as well as custom????

    // todo show calendar and normal booking stuffs
    // todo error handling for selecting a service
    // todo may want to pass user firstname and lastname so she knows who she is booking for

    const router = useRouter();
    const [selectedServices, setSelectedServices] = useState<string[]>(
        booking.type.split(", ")
    );
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [originalPrice, setOriginalPrice] = useState(0);
    const [originalTime, setOriginalTime] = useState(0);
    const [customPrice, setCustomPrice] = useState(0);
    const [customTime, setCustomTime] = useState(0);

    const ctx = api.useContext();
    const { data: futureBookings } = api.booking.getFuture.useQuery();
    const { data: serviceData } = api.service.getAllNormalized.useQuery();
    const { mutate } = api.booking.create.useMutation({
        onSuccess: () => {
            void ctx.booking.getFuture.invalidate();
            toast.success("Booking Updated!", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void router.push("/admin/bookings");
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
                userId: booking.userId,
                price: customPrice,
            };

            setDate(undefined);
            mutate(data);
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
        <div className="flex flex-col items-center justify-center">
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
                bookedDates={futureBookings.filter(
                    (el) => el.id !== booking.id
                )}
            />

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
