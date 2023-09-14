import { api } from "~/utils/api";
import CreateBooking from "../../components/Bookings/Create";
// import { useSession } from "next-auth/react";
import { useState } from "react";
import { Services, Specifications } from "~/components/NewBookingForm";
import type { FormDataType } from "~/components/NewBookingForm/Services";
import type { NormalizedServicesType } from "~/server/api/routers/service";
import type {
    SelectionsType,
    SpecificationsType,
} from "~/components/NewBookingForm/Specifications";
import { useMobile } from "~/components/MobileContext";

type FormProps = {
    key: number;
    serviceData: NormalizedServicesType | undefined;
};

// Redirect to sign up & new client form
const form = [
    (props: FormProps) => <Services {...props} />,
    (props: FormProps) => <Specifications {...props} />,
    (props: FormProps) => <CreateBooking {...props} />,
];

// TODO: Geni orders by price and time

export default function Booking() {
    // const { data: session } = useSession(); // TODO: Redirect if not logged in
    const [page, setPage] = useState(0);
    const [requireConsult, setRequireConsult] = useState<string>("");
    const { data: serviceData } = api.service.getAllNormalized.useQuery();
    const { isMobile } = useMobile();

    const checkForValidSelections = () => {
        const serviceCheck = localStorage.getItem("Services");
        if (serviceCheck && serviceData) {
            const services = JSON.parse(serviceCheck) as FormDataType;

            let counter = 0;
            for (const [serviceName, isSelected] of Object.entries(services)) {
                if (isSelected && serviceData[serviceName]?.requireConsult) {
                    setRequireConsult(serviceName);
                }
                if (isSelected && serviceName !== "Quiet") counter++;
            }

            if (!counter) return null;
        } else return null;
    };

    const checkForValidSpecifications = () => {
        const serviceCheck = localStorage.getItem("Services");
        const specCheck = localStorage.getItem("Specifications");

        if (serviceCheck && specCheck && serviceData) {
            const services = JSON.parse(serviceCheck) as FormDataType;
            const specifications = JSON.parse(specCheck) as SpecificationsType;

            let optionCounter = 0;
            let choiceCounter = 0;
            for (const [serviceName, isSelected] of Object.entries(services)) {
                if (isSelected) {
                    optionCounter++;
                    const options =
                        serviceData[serviceName]?.subcategories ?? [];

                    options.forEach((el) => {
                        if (
                            el.name ===
                            specifications[serviceName as SelectionsType]
                        ) {
                            if (el.requireConsult)
                                setRequireConsult(
                                    specifications[
                                        serviceName as SelectionsType
                                    ]
                                );
                            choiceCounter++;
                        }
                    });
                }
            }
            if (!optionCounter) return null;
            if (!choiceCounter) return null;
            if (optionCounter !== choiceCounter) return null;
        } else return null;
    };

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum === 1) {
            if (checkForValidSelections() === null) return;
        } else if (newNum === 2) {
            if (checkForValidSpecifications() === null) return;
        } else {
            setRequireConsult("");
        }

        if (newNum < form.length && newNum >= 0) setPage(page + num);
        else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    return isMobile ? (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="mb-5 font-grand-hotel text-5xl text-white">
                Book An Appointment
            </h1>

            <div>
                {requireConsult ? (
                    <div className=" flex w-80 flex-col items-center justify-center gap-5 rounded-2xl bg-glass p-10 text-xl text-white shadow-xl">
                        <div>{"Let's touch base before this appointment!"}</div>
                        <div>Text me at:</div>
                        <div className="rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 px-4 py-2 shadow-lg">
                            <a href="tel:+14252417865">(425) 241-7865</a>
                        </div>
                    </div>
                ) : (
                    (form[page] as (props: FormProps) => JSX.Element)({
                        key: page,
                        serviceData,
                    })
                )}

                <div className="mb-20 mt-10 flex items-center justify-center gap-10 font-quattrocento text-2xl text-white">
                    <button
                        onClick={() => changePages(-1)}
                        className="transform rounded-md bg-glass px-6 py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        Back
                    </button>
                    {requireConsult ? (
                        <button
                            // TODO: Submit partial booking and redirect back home
                            onClick={() => console.log("")}
                            className="transform rounded-md bg-glass px-6 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Submit
                        </button>
                    ) : page !== form.length - 1 ? (
                        <button
                            onClick={() => changePages(1)}
                            className="transform rounded-md bg-glass px-6 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Next
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="mb-5 font-grand-hotel text-8xl text-white">
                Book An Appointment
            </h1>

            <div>
                {requireConsult ? (
                    <div className=" flex flex-col items-center gap-10 rounded-2xl bg-glass p-10 text-3xl text-white shadow-xl">
                        <div>{"Let's touch base before this appointment!"}</div>
                        <div>
                            Text me at{" "}
                            <span className="rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 px-4 py-2 shadow-lg">
                                {" "}
                                (425) 241-7865{" "}
                            </span>{" "}
                        </div>
                    </div>
                ) : (
                    (form[page] as (props: FormProps) => JSX.Element)({
                        key: page,
                        serviceData,
                    })
                )}

                <div className="mb-20 mt-10 flex items-center justify-center gap-10 font-quattrocento text-2xl text-white">
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
