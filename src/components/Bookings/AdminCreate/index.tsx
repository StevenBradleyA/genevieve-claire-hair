import { useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import AdminBookingSelectService from "./selectService";

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

    const [type, setType] = useState<string>("");

    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    console.log(selectedServices);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-5xl mb-3">{`${firstName} ${lastName}`} </div>
            <AdminBookingSelectService
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
            />
        </div>
    );
}
