import type { ServiceSubcategory } from "@prisma/client";
import { useState } from "react";
import type { ServicesType } from "~/server/api/routers/service";
import { api } from "~/utils/api";
import { motion } from "framer-motion";

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
        <div className="flex flex-col gap-10 text-xl">
            <label>
                Name     
                <input
                    className="rounded-md bg-glass p-2  text-purple-300 placeholder:text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Price     
                <input
                    className="rounded-md bg-glass p-2  text-purple-300 placeholder:text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </label>
            <label>
                Time     
                <input
                    className="rounded-md bg-glass p-2  text-purple-300 placeholder:text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                />
            </label>
            <label>
                Bundle Time     
                <input
                    className="rounded-md bg-glass p-2  text-purple-300 placeholder:text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    value={bundleTime}
                    onChange={(e) => setBundleTime(Number(e.target.value))}
                />
            </label>
            <label>
                Require Consult?     
                <input
                    className="rounded-md bg-glass p-2  text-purple-300 placeholder:text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
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
            <motion.button
                className="rounded-3xl bg-darkGlass p-2"
                onClick={updateSubService}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                Update Service
            </motion.button>
        </div>
    );
}
