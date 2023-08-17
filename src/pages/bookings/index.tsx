import { api } from "~/utils/api";
import CreateBooking from "../../components/Bookings/Create";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Services, Specifications } from "~/components/NewBookingForm";
import type { FormDataType } from "~/components/NewBookingForm/Services";
import type { SpecificationsType } from "~/components/NewBookingForm/Specifications";

// Redirect to sign up & new client form
const form = [
    <Services key={0} />,
    <Specifications key={1} />,
    <CreateBooking key={2} />,
];
export default function Booking() {
    // const { data: session } = useSession(); // TODO: Redirect if not logged in
    const [page, setPage] = useState(0);
    const [requireConsult, setRequireConsult] = useState<string>("");

    const checkForConsultServices = () => {
        const services = localStorage.getItem("Services");
        if (services) {
            const choicesObj = JSON.parse(services) as FormDataType;

            if (choicesObj["Vivids"]) {
                setRequireConsult("Vivids");
            } else if (choicesObj["Color Corrections"]) {
                setRequireConsult("Color Corrections");
            } else setRequireConsult("");
        } else return null;
    };

    const checkForConsultSpecifications = () => {
        const specifications = localStorage.getItem("Specifications");
        if (specifications) {
            const specObj = JSON.parse(specifications) as SpecificationsType;

            if (specObj.Styling === "Bridal/Wedding")
                setRequireConsult("Bridal/Wedding");
            else setRequireConsult("");

            if (specObj.ready) return true;
            else return null;
        }
    };

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum === 1) {
            if (checkForConsultServices() === null) return;
        } else if (newNum === 2) {
            if (checkForConsultSpecifications() === null) return;
        } else {
            setRequireConsult("");
        }

        if (newNum < form.length && newNum >= 0) setPage(page + num);
        else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="font-grand-hotel text-8xl text-white">
                Book An Appointment
            </h1>

            <div>
                <div>
                    {requireConsult ? (
                        <div>Please contact me to discuss your appointment</div>
                    ) : (
                        form[page]
                    )}
                </div>

                <div className="mt-5 flex items-center justify-center gap-10 font-quattrocento text-2xl text-white">
                    <button
                        onClick={() => changePages(-1)}
                        className="transform rounded-md bg-glass px-4 py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        Back
                    </button>
                    {requireConsult ? (
                        <button
                            // TODO: Submit partial booking and redirect back home
                            onClick={() => console.log("")}
                            className="transform rounded-md bg-glass px-4 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={() => changePages(1)}
                            className="transform rounded-md bg-glass px-4 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            {page === form.length - 1 ? "Submit" : "Next"}
                        </button>
                    )}
                </div>
                {/* Submit using local storage check */}
            </div>
        </div>
    );
}
