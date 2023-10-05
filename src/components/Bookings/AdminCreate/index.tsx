import { useState } from "react";
import AdminBookingSelectService from "./selectService";
import { api } from "~/utils/api";
import { DotLoader } from "react-spinners";
import AdminCalendar from "./AdminCalendar";

interface AdminCreateBookingProps {
    closeModal: () => void;
    userId: string;
    firstName: string;
    lastName: string;
}

export default function AdminCreateBooking({
    closeModal,
    userId,
    firstName,
    lastName,
}: AdminCreateBookingProps) {
    // TODO CUSTOM TIME SELECTION -- KEEPS TRACK OF OTHER BOOKINGS BUT DOESNT HAVE SCHEDULE TIME CONSTRAINTS
    // TODO have default service times as well as custom????

    // todo show calendar and normal booking stuffs
    // todo error handling for selecting a service
    // todo may want to pass user firstname and lastname so she knows who she is booking for

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<Date>();
    const [details, setDetails] = useState({
        totalPrice: 0,
        totalTime: 0,
        services: "",
    });

    const { data: futureBookings } = api.booking.getFuture.useQuery();

    if (!futureBookings)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={true} />
            </div>
        );

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-3 text-5xl">{`${firstName} ${lastName}`} </div>
            <AdminBookingSelectService
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
            />

            <AdminCalendar
                date={date}
                setDate={setDate}
                timeSlot={timeSlot}
                setTimeSlot={setTimeSlot}
                details={details}
                bookedDates={futureBookings}
            />
        </div>
    );
}
