import { useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import AdminBookingSelectService from "./selectService";

interface AdminCreateBookingProps {
    closeModal: () => void;
    userId: string;
}

export default function AdminCreateBooking({
    closeModal,
    userId,
}: AdminCreateBookingProps) {
    //todo Show all service and specifications
    // todo show calendar and normal booking stuffs
    // todo error handling for selecting a service

    const [type, setType] = useState<string>("");

    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    console.log(selectedServices);

    return (
        <div className="flex flex-col items-center justify-center">
            <AdminBookingSelectService
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
            />
        </div>
    );
}
