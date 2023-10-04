import { useState } from "react";
import type { ServicesType } from "~/server/api/routers/service";
import { api } from "~/utils/api";

interface SelectServiceType {
    selectedServices: string[];
    setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AdminBookingSelectService({
    selectedServices,
    setSelectedServices,
}: SelectServiceType) {
    const { data: serviceData } = api.service.getAllNormalized.useQuery();
    const [isSelected, setIsSelected] = useState<boolean>(false);

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
            setIsSelected(true);
        }
    };

    const handleClearSelection = () => {
        // Clears all selected services
        setIsSelected(false);
        setSelectedServices([]);
        const selects = document.querySelectorAll("select");
        selects.forEach((select) => {
            select.value = "";
        });
    };

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {serviceData &&
                    Object.values(serviceData).map((service: ServicesType) => (
                        <div key={service.id}>
                            {service.subcategories.length > 0 ? (
                                <select
                                    className={`rounded-2xl px-6 py-2 text-xl ${
                                        service.subcategories.some(
                                            (subcategory) =>
                                                selectedServices.includes(
                                                    `${service.name}: ${subcategory.name}`
                                                )
                                        )
                                            ? "bg-gradient-to-br from-fuchsia-200 to-blue-300 "
                                            : "bg-darkGlass"
                                    }`}
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
                                    className={`rounded-2xl px-6 py-2 text-xl ${
                                        selectedServices.includes(service.name)
                                            ? "bg-gradient-to-br from-fuchsia-200 to-blue-300 "
                                            : "bg-darkGlass"
                                    }`}
                                >
                                    {service.name}
                                </button>
                            )}
                        </div>
                    ))}
            </div>
            <button
                onClick={handleClearSelection}
                className="mt-4 rounded-2xl bg-blue-300 px-6 py-2 text-xl"
            >
                Clear Selection
            </button>
        </>
    );
}
