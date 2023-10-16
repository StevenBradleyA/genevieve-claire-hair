import { format } from "date-fns";
import type { TimeOff } from "@prisma/client";
import { motion } from "framer-motion";

const TimeOffDetails = ({ startDate, endDate }: TimeOff) => {
    let title = "";
    let time = "";

    if (startDate.getHours() !== endDate.getHours()) {
        title = format(startDate, "E, MMM do, y");
        time = `${format(startDate, "paa")} to
                ${format(endDate, "paa")}`;
    } else if (startDate.getTime() === endDate.getTime()) {
        title = format(startDate, "E, MMM do, y");
        time = "All Day";
    } else {
        title = "Multiple Days";
        time = time = `${format(startDate, "E, MMM do, y")} to
                ${format(endDate, "E, MMM do, y")}`;
    }
    return (
        <>
            <div className="rounded-2xl bg-darkGlass px-4 py-2  text-center shadow-lg">
                {title}
            </div>
            <div className="flex justify-center text-xl text-violet-400">
                {time}
            </div>
        </>
    );
};

export default function TimeOffCard({
    timeOff,
    showDelete,
    deleteSelect,
    setDeleteSelect,
}: {
    timeOff: TimeOff;
    showDelete: boolean;
    deleteSelect: { [id: number]: boolean };
    setDeleteSelect: React.Dispatch<
        React.SetStateAction<{
            [id: number]: boolean;
        }>
    >;
}) {
    return (
        <div className="flex flex-col gap-2 rounded-2xl bg-darkGlass p-5 text-2xl text-white shadow-xl">
            <TimeOffDetails {...timeOff} />
            {showDelete ? (
                <motion.button
                    onClick={() => {
                        if (deleteSelect[timeOff.id]) {
                            setDeleteSelect((prev) => {
                                const newState = { ...prev };
                                delete newState[timeOff.id];

                                return newState;
                            });
                        } else {
                            setDeleteSelect((prev) => ({
                                ...prev,
                                [timeOff.id]: true,
                            }));
                        }
                    }}
                    className="flex justify-center rounded-2xl bg-darkGlass px-6 py-2 text-violet-400 shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {deleteSelect[timeOff.id] ? "Selected!" : "Not selected"}
                </motion.button>
            ) : null}
        </div>
    );
}
