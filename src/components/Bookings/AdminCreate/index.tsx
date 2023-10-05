import { useEffect, useState } from "react";
import AdminBookingSelectService from "./selectService";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import type { NormalizedServicesType } from "~/server/api/routers/service";
import { DotLoader } from "react-spinners";
import type { DaysType, ScheduleType } from "~/server/api/routers/schedule";
import { DayPicker, type Matcher } from "react-day-picker";
import TimeSlotPicker from "../Create/TimeSlotPicker";

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

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-3 text-5xl">{`${firstName} ${lastName}`} </div>
            <AdminBookingSelectService
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
            />
        </div>
    );
}
