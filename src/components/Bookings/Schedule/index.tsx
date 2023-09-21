import { useEffect, useState } from "react";
import { useSchedule } from "~/components/ScheduleContext";

interface Schedule {
    schedule: { [key: number]: number[] };
    setSchedule: (schedule: { [key: number]: number[] }) => void;
}

export default function ScheduleChange() {
    const { schedule, setSchedule } = useSchedule() as Schedule;
    const [isMondayActive, setIsMondayActive] = useState<boolean>(false);
    const [isTuesdayActive, setIsTuesdayActive] = useState<boolean>(false);
    const [isWednesdayActive, setIsWednesdayActive] = useState<boolean>(false);
    const [isThursdayActive, setIsThursdayActive] = useState<boolean>(false);
    const [isFridayActive, setIsFridayActive] = useState<boolean>(false);
    const [isSaturdayActive, setIsSaturdayActive] = useState<boolean>(false);
    const [isSundayActive, setIsSundayActive] = useState<boolean>(false);
    const [dayTimes, setDayTimes] = useState<{ [key: number]: number[] }>(
        schedule
    );

    /**
     * Monday: 9am - 1pm
     * Tuesday: 9am - 5pm
     * Wed-Fri: 10am - 7pm
     */
    // const [schedule, setSchedule] = useState<{ [key: number]: number[] }>({
    //     1: [9, 13],
    //     2: [9, 17],
    //     3: [10, 19],
    //     4: [10, 19],
    //     5: [10, 19],
    // });

    // Create an array of hours from 0 to 23
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Event handler for updating start and end times
    const handleStartTimeChange = (dayOfWeek: number, newStartTime: number) => {
        setDayTimes({
            ...dayTimes,
            [dayOfWeek]: [newStartTime, dayTimes[dayOfWeek][1]],
        });
    };

    const handleEndTimeChange = (dayOfWeek: number, newEndTime: number) => {
        setDayTimes({
            ...dayTimes,
            [dayOfWeek]: [dayTimes[dayOfWeek][0], newEndTime],
        });
    };

    useEffect(() => {
        setIsSundayActive(0 in schedule);
        setIsMondayActive(1 in schedule);
        setIsTuesdayActive(2 in schedule);
        setIsWednesdayActive(3 in schedule);
        setIsThursdayActive(4 in schedule);
        setIsFridayActive(5 in schedule);
        setIsSaturdayActive(6 in schedule);
    }, [schedule]);

    console.log("sched", schedule);
    console.log("daytimes", dayTimes);

    const handleUpdateClick = (e) => {
        e.preventDefault();
        // setSchedule(dayTimes);
        setSchedule((prevSchedule) => ({ ...prevSchedule, ...dayTimes }));
        // TODO may want to void booking stuf to update the sched
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
                <div className="rounded-2xl bg-darkGlass p-2">Monday</div>
                {isMondayActive ? (
                    <>
                        <div>
                            Start Time:{" "}
                            <select
                                value={dayTimes[1][0]}
                                onChange={(e) =>
                                    handleStartTimeChange(
                                        1,
                                        parseInt(e.target.value)
                                    )
                                }
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
                                value={dayTimes[1][1]}
                                onChange={(e) =>
                                    handleEndTimeChange(
                                        1,
                                        parseInt(e.target.value)
                                    )
                                }
                                className="rounded-2xl bg-darkGlass"
                            >
                                {hours.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}:00
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="rounded-2xl bg-darkGlass px-4 py-2 text-red-600">
                            remove day availability
                        </div>
                    </>
                ) : (
                    <div>disabled</div>
                )}
            </div>
            {/* Tuesday */}
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

            {/* Wednesday */}
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

            {/* Thursday */}
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

            {/* Friday */}
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

            {/* Saturday */}
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

            {/* Sunday */}
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
        </div>
    );
}

/*
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



*/
