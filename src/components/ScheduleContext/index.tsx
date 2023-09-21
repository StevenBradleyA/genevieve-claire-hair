import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ScheduleContextType {
    schedule: { [key: number]: number[] };
    setSchedule: (schedule: { [key: number]: number[] }) => void;
}

interface ScheduleProviderProps {
    children: ReactNode;
}
const ScheduleContext = createContext<ScheduleContextType | undefined>(
    undefined
);

export function useSchedule() {
    return useContext(ScheduleContext);
}
const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
    const [schedule, setSchedule] = useState<{ [key: number]: number[] }>({
        1: [9, 13],
        2: [9, 17],
        3: [10, 19],
        4: [10, 19],
        5: [10, 19],
    });

    return (
        <ScheduleContext.Provider value={{ schedule, setSchedule }}>
            {children}
        </ScheduleContext.Provider>
    );
};
export default ScheduleProvider;
