import { useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import type { ServicesType } from "~/server/api/routers/service";

// id: number;
// name: string;
// price: number;
// time: number;
// bundleTime: number;
// requireConsult: boolean;
// serviceCategoryId: number;

export default function UpdateMainService({
    mainService,
    closeModal,
}: {
    mainService: ServicesType;
    closeModal: () => void;
}) {
    const [name, setName] = useState(mainService.name);
    const [price, setPrice] = useState(mainService.price ?? 100);
    const [requireConsult, setRequireConsult] = useState(
        mainService.requireConsult
    );

    const ctx = api.useContext();
    const { mutate } = api.service.updateMainCategory.useMutation({
        onSuccess: () => {
            void ctx.service.getAll.invalidate();
            void ctx.service.getPrices.invalidate();
        },
    });

    const updateSubService = () => {
        if (name && price) {
            mutate({
                ...mainService,
                name,
                price,
                requireConsult,
            });
            closeModal();
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
