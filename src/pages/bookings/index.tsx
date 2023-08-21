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

            const nonQuietCheck = Object.entries(choicesObj).filter(
                ([, selected]) => selected
            );

            if (
                nonQuietCheck.length === 1 &&
                nonQuietCheck[0] &&
                nonQuietCheck[0][0] === "Quiet"
            ) {
                return null;
            }
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
            <h1 className="mb-5 font-grand-hotel text-8xl text-white">
                Book An Appointment
            </h1>

            <div>
                {requireConsult ? (
                    <div className=" flex flex-col items-center gap-10 rounded-2xl bg-glass p-10 text-3xl text-white shadow-xl">
                        <div className="">
                            {"Let's touch base before this appointment!"}
                        </div>
                        <div className="">
                            Text me at{" "}
                            <span className="rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 px-4 py-2 shadow-lg">
                                {" "}
                                (425) 241-7865{" "}
                            </span>{" "}
                        </div>
                    </div>
                ) : (
                    form[page]
                )}

                <div className="mt-10 flex items-center justify-center gap-10 font-quattrocento text-2xl text-white">
                    <button
                        onClick={() => changePages(-1)}
                        className="transform rounded-md bg-glass px-12 py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        Back
                    </button>
                    {requireConsult ? (
                        <button
                            // TODO: Submit partial booking and redirect back home
                            onClick={() => console.log("")}
                            className="transform rounded-md bg-glass px-12 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Submit
                        </button>
                    ) : page !== form.length - 1 ? (
                        <button
                            onClick={() => changePages(1)}
                            className="transform rounded-md bg-glass px-12 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Next
                        </button>
                    ) : null}
                </div>
                {/* Submit using local storage check */}
            </div>
        </div>
    );
}

/**
 * allowNextPage(page)
 *
 * switch case
 *
 * 0 => if anything other than "Quiet" is selected
 *
 * 1 => if chosen all specifications
 *
 * 2 => if date and time are chosen
 *
 * 3 => once order has been reviewed
 *
 * API on success remove from local storage
 */
