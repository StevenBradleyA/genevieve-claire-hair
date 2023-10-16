import { api } from "~/utils/api";
import TimeOffCard from "./TimeOffCard";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DisplayTimeOff() {
    const [showDelete, setShowDelete] = useState(false);
    const [deleteSelect, setDeleteSelect] = useState<{ [id: number]: boolean }>(
        {}
    );

    const ctx = api.useContext();
    const { data } = api.schedule.getTimeOff.useQuery();

    const { mutate } = api.schedule.deleteTimeOff.useMutation({
        onSuccess: () => {
            void ctx.schedule.getTimeOff.invalidate();
        },
    });

    const deleteTimeOff = () => {
        mutate(deleteSelect);
        setShowDelete(false);
        setDeleteSelect({});
    };

    const isEmpty = () => {
        for (const check in deleteSelect) {
            return false;
        }
        return true;
    };

    if (!data) return <h1>Loading...</h1>;

    return (
        <>
            <div className="mt-5 flex justify-center gap-5 text-lg font-bold">
                {!showDelete && (
                    <>
                        <motion.button
                            onClick={() => setShowDelete(true)}
                            className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-400 shadow-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enable delete selector
                        </motion.button>
                    </>
                )}

                {showDelete && (
                    <>
                        <motion.button
                            className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-300 shadow-md"
                            onClick={deleteTimeOff}
                            disabled={isEmpty()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Delete 🫡
                        </motion.button>
                        <motion.button
                            className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-300 shadow-md"
                            onClick={() => {
                                setShowDelete(false);
                                setDeleteSelect({});
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Cancel
                        </motion.button>
                    </>
                )}
            </div>

            {[...data.full, ...data.partial].map((date) => (
                <TimeOffCard
                    key={date.id}
                    timeOff={date}
                    showDelete={showDelete}
                    deleteSelect={deleteSelect}
                    setDeleteSelect={setDeleteSelect}
                />
            ))}
        </>
    );
}
