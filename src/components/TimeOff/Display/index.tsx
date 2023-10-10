import { format } from "date-fns";
import { api } from "~/utils/api";

export default function DisplayTimeOff() {
    // TODO: Show time off slots with the option to update and delete
    const { data } = api.schedule.getTimeOff.useQuery();

    if (!data) return <h1>Loading...</h1>;

    return (
        <div>
            {[...data.full, ...data.partial].map((date) => (
                <div key={date.id} className="m-3 border-2 border-white p-3">
                    <div>From {format(date.startDate, "PPp")}</div>
                    <div>To {format(date.endDate, "PPp")}</div>
                </div>
            ))}
        </div>
    );
}
