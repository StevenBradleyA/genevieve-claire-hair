import { useState } from "react";
import { api } from "~/utils/api";
import type { ServicesType } from "~/server/api/routers/service";
import { motion } from "framer-motion";

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
    const [isBlondingSelected, setIsBlondingSelected] =
        useState<boolean>(false);
    const [isVividSelected, setIsVividSelected] = useState<boolean>(false);
    const [isHaircutSelected, setIsHaircutSelected] = useState<boolean>(false);
    const [isColorCorrectionSelected, setIsColorCorrectionSelected] =
        useState<boolean>(false);
    const [selectedService, setSelectedService] = useState<ServicesType | null>(
        null
    );
    const { data: serviceData } = api.service.getAllNormalized.useQuery();

    console.log(serviceData);

    const handleServiceSelect = (service: ServicesType) => {
        setSelectedService(service);
    };

    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                {serviceData &&
                    Object.values(serviceData).map((service: ServicesType) => (
                        <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service)}
                            className="rounded-2xl bg-darkGlass px-6 py-2 text-xl"
                        >
                            {service.name}
                        </button>
                    ))}
            </div>

            {selectedService && selectedService.subcategories.length > 0 && (
                <div>
                    <h3>Subcategories for {selectedService.name}:</h3>
                    <ul>
                        {selectedService.subcategories.map(
                            (subcategory: ServicesType.subcategories) => (
                                <li key={subcategory.id}>{subcategory.name}</li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
