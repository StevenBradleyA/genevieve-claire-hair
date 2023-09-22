import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { Schedule } from "@prisma/client";

interface ScheduleProps {
    schedule: Schedule;
    closeModal: () => void;
}

export default function EachSchedule({ schedule, closeModal }: ScheduleProps) {
    const [startTime, setStartTime] = useState(schedule.startTime);
    const [endTime, setEndTime] = useState(schedule.endTime);

    const ctx = api.useContext();

    const { mutate } = api.schedule.updateSchedule.useMutation({
        onSuccess: () => {
            void ctx.schedule.getFilteredDays.invalidate();
            void ctx.schedule.getAllDays.invalidate();
        },
    });

    const handleScheduleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        data = {
            id: schedule.id,
            dayOfWeek: schedule.dayOfWeek,
            startTime,
            endTime,
        };

        mutate(data)
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <form className="mb-5 flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
            <div className="">
                {
                    [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ][schedule.dayOfWeek]
                }
            </div>
            <select
                value={startTime}
                onChange={(e) => setStartTime(parseInt(e.target.value, 10))}
                className="mr-3 rounded-2xl bg-darkGlass p-2"
            >
                {hours.map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}:00
                    </option>
                ))}
            </select>
            <select
                value={endTime}
                onChange={(e) => setEndTime(parseInt(e.target.value, 10))}
                className="mr-3 rounded-2xl bg-darkGlass p-2"
            >
                {hours.map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}:00
                    </option>
                ))}
            </select>
            <button className="rounded-2xl bg-darkGlass px-4 py-2">
                Update
            </button>
        </form>
    );
}

/*

<div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Monday</div>
                {isMondayActive ? (
                    <>
                        <div>
                            Start Time:{" "}
                            <select
                                value={dayTimes[1]?.[0] || 0}
                                // onChange={}
                                className="mr-3 rounded-2xl bg-darkGlass"
                            >
                                {hours.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}:00
                                    </option>
                                ))}
                            </select>
                            End Time:{" "}
                            <select
                                value={dayTimes[1]?.[1] || 0}
                                // onChange={}
                                className="rounded-2xl bg-darkGlass"
                            >
                                {hours.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}:00
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => handleRemoveDay(1)}
                            className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600"
                        >
                            remove day availability
                        </button>
                    </>
                ) : (
                    <>
                        <div>disabled</div>
                        <button
                            onClick={() => handleAddDay(1)}
                            className="rounded-2xl bg-darkGlass px-4 py-2 text-green-600"
                        >
                            add day availability
                        </button>
                    </>
                )}
            </div>

            <div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Tuesday</div>
                {isTuesdayActive ? (
                    <>
                        <div>
                            Start Time: {schedule[2][0]}, End Time:{" "}
                            {schedule[2][1]}
                        </div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600">
                            remove day availability
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">disabled</div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-green-600">
                            add day availability
                        </div>
                    </>
                )}
            </div>


            <div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Wednesday</div>
                {isWednesdayActive ? (
                    <>
                        <div>
                            Start Time: {schedule[3][0]}, End Time:{" "}
                            {schedule[3][1]}
                        </div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600">
                            remove day availability
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">disabled</div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-green-600">
                            add day availability
                        </div>
                    </>
                )}
            </div>


            <div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Thursday</div>
                {isThursdayActive ? (
                    <>
                        <div>
                            Start Time: {schedule[4][0]}, End Time:{" "}
                            {schedule[4][1]}
                        </div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600">
                            remove day availability
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">disabled</div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-green-600">
                            add day availability
                        </div>
                    </>
                )}
            </div>

            <div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Friday</div>
                {isFridayActive ? (
                    <>
                        <div>
                            Start Time: {schedule[5][0]}, End Time:{" "}
                            {schedule[5][1]}
                        </div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600">
                            remove day availability
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">disabled</div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-green-600">
                            add day availability
                        </div>
                    </>
                )}
            </div>


            <div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Saturday</div>
                {isSaturdayActive ? (
                    <>
                        <div>
                            Start Time: {schedule[6][0]}, End Time:{" "}
                            {schedule[6][1]}
                        </div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600">
                            remove day availability
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">disabled</div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-green-600">
                            add day availability
                        </div>
                    </>
                )}
            </div>

            <div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Sunday</div>
                {isSundayActive ? (
                    <>
                        <div>
                            Start Time: {schedule[0][0]}, End Time:{" "}
                            {schedule[0][1]}
                        </div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600">
                            remove day availability
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">disabled</div>
                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-green-600">
                            add day availability
                        </div>
                    </>
                )}
            </div>
            <button
                className="rounded-2xl bg-darkGlass px-4 py-2"
                onClick={handleUpdateClick}
            >
                Update
            </button>









  const daysOfWeek = [
        { name: "Monday", index: 1 },
        { name: "Tuesday", index: 2 },
        { name: "Wednesday", index: 3 },
        { name: "Thursday", index: 4 },
        { name: "Friday", index: 5 },
        { name: "Saturday", index: 6 },
        { name: "Sunday", index: 7 },
    ];
  const { schedule, setSchedule } = useSchedule();
    const { isActive, setIsActive } = useState(false);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex">
                <div>Monday</div>
                <div>
                    Start Time: {schedule[1][0]}, End Time: {schedule[1][1]}
                </div>
            </div>
            <div className="flex">
                <div>Tuesday</div>
                <div>
                    Start Time: {schedule[2][0]}, End Time: {schedule[2][1]}
                </div>
            </div>
            <div className="flex">
                <div>Wednesday</div>
                <div>
                    Start Time: {schedule[3][0]}, End Time: {schedule[3][1]}
                </div>
            </div>
            <div className="flex">
                <div>Thursday</div>
                <div>
                    Start Time: {schedule[4][0]}, End Time: {schedule[4][1]}
                </div>
            </div>
            <div className="flex">
                <div>Friday</div>
                <div>
                    Start Time: {schedule[5][0]}, End Time: {schedule[5][1]}
                </div>
            </div>
            <div className="flex">
                <div>Saturday</div>
             <div>
                    Start Time: {schedule[6][0]}, End Time: {schedule[6][1]}
                </div>
                </div>
                <div className="flex">
                    <div>Sunday</div>
                     <div>
                        Start Time: {schedule[7][0]}, End Time: {schedule[7][1]}
                    </div> 
                </div>
            </div>
        );
    }



  // const scheduleData = [
    //     { dayOfWeek: 1, startTime: 9, endTime: 13 },
    //     { dayOfWeek: 2, startTime: 9, endTime: 17 },
    //     { dayOfWeek: 3, startTime: 10, endTime: 19 },
    //     { dayOfWeek: 4, startTime: 10, endTime: 19 },
    //     { dayOfWeek: 5, startTime: 10, endTime: 19 },
    // ];

    // for (const data of scheduleData) {
    //     await prisma.schedule.create({
    //         data,
    //     });
    // }
    // model Schedule {
//     id        Int @id @default(autoincrement())
//     dayOfWeek Int
//     startTime Int
//     endTime   Int
// }









*/
