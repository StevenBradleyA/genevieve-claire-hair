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

    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const { data: serviceData } = api.service.getAllNormalized.useQuery();

    console.log(selectedServices);

    const handleServiceSelect = (
        service: ServicesType,
        subcategory?: string
    ) => {
        const serviceName = subcategory
            ? `${service.name}: ${subcategory}`
            : service.name;

        if (selectedServices.includes(serviceName)) {
            // If service with this subcategory is already selected, unselect it
            setSelectedServices((prevServices) =>
                prevServices.filter(
                    (prevService) => prevService !== serviceName
                )
            );
        } else {
            const serviceType = service.name;
            const servicesWithSameType = selectedServices.filter((service) =>
                service.startsWith(serviceType)
            );

            if (servicesWithSameType.length > 0) {
                setSelectedServices((prevServices) =>
                    prevServices.filter(
                        (prevService) => !prevService.startsWith(serviceType)
                    )
                );
            }

            // Add the selected service with subcategory
            setSelectedServices((prevServices) => [
                ...prevServices,
                serviceName,
            ]);
        }
    };

    const handleClearSelection = () => {
        // Clears all selected services
        setSelectedServices([]);
        const selects = document.querySelectorAll("select");
        selects.forEach((select) => {
            select.value = "";
        });
    };

    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                {serviceData &&
                    Object.values(serviceData).map((service: ServicesType) => (
                        <div key={service.id}>
                            {service.subcategories.length > 0 ? (
                                <select
                                    className="rounded-2xl bg-darkGlass px-6 py-2 text-xl"
                                    onChange={(e) =>
                                        handleServiceSelect(
                                            service,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" disabled selected>
                                        {service.name}
                                    </option>
                                    {service.subcategories.map(
                                        (subcategory) => (
                                            <option
                                                key={subcategory.id}
                                                value={subcategory.name}
                                            >
                                                {subcategory.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            ) : (
                                <button
                                    key={service.id}
                                    onClick={() => handleServiceSelect(service)}
                                    className="rounded-2xl px-6 py-2 text-xl"
                                    style={{
                                        backgroundColor:
                                            selectedServices.includes(
                                                service.name
                                            )
                                                ? "blue" // Change to your desired background color for selected services
                                                : "gray", // Change to your desired background color for unselected services
                                    }}
                                >
                                    {service.name}
                                </button>
                            )}
                        </div>
                    ))}
            </div>
            <button
                onClick={handleClearSelection}
                className="mt-4 rounded-2xl px-6 py-2 text-xl"
            >
                Clear Selection
            </button>
        </div>
    );
}
