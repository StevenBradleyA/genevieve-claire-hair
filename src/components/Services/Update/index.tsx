import type { ServiceSubcategory } from "@prisma/client";
import { useState } from "react";
import type { ServicesType } from "~/server/api/routers/service";
import { api } from "~/utils/api";

// id: number;
// name: string;
// price: number;
// time: number;
// bundleTime: number;
// requireConsult: boolean;
// serviceCategoryId: number;

export default function UpdateService({
    subService,
    serviceData,
}: {
    subService: ServiceSubcategory;
    serviceData: ServicesType[];
}) {
    const [name, setName] = useState(subService.name);
    const [price, setPrice] = useState(subService.price);
    const [time, setTime] = useState(subService.time);
    const [bundleTime, setBundleTime] = useState(subService.bundleTime);
    const [requireConsult, setRequireConsult] = useState(
        subService.requireConsult
    );

    const ctx = api.useContext();
    const { mutate } = api.service.updateSubcategory.useMutation({
        onSuccess: () => {
            void ctx.service.getAll.invalidate();
        },
    });

    const updateSubService = () => {
        if (name && price && time && bundleTime) {
            mutate({
                ...subService,
                name,
                price,
                time,
                bundleTime,
                requireConsult,
            });
        }
    };

    return (
        <div>
            <label>
                Name
                <input
                    className="text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Price
                <input
                    className="text-black"
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </label>
            <label>
                Time
                <input
                    className="text-black"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                />
            </label>
            <label>
                Bundle Time
                <input
                    className="text-black"
                    value={bundleTime}
                    onChange={(e) => setBundleTime(Number(e.target.value))}
                />
            </label>
            <label>
                Require Consult?
                <input
                    className="text-black"
                    value={requireConsult ? "yes" : "no"}
                    onChange={(e) =>
                        setRequireConsult(
                            e.target.value.toLowerCase() === "yes"
                                ? true
                                : false
                        )
                    }
                />
            </label>
            <button className="p-2" onClick={updateSubService}>
                ✅
            </button>
        </div>
    );
}
