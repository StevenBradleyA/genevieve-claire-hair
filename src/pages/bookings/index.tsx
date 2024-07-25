import { api } from "~/utils/api";
import CreateBooking from "../../components/Bookings/Create";
import { useState } from "react";
import { Services, Specifications } from "~/components/NewBookingForm";
import type { FormDataType } from "~/components/NewBookingForm/Services";
import type { NormalizedServicesType } from "~/server/api/routers/service";
import type {
    SelectionsType,
    SpecificationsType,
} from "~/components/NewBookingForm/Specifications";
import { useMobile } from "~/components/MobileContext";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Footer from "~/components/Footer/footer";
import heart from "@public/Logos/heart-logo.png";
import Image from "next/image";

type FormProps = {
    key: number;
    serviceData: NormalizedServicesType | undefined;
};

const form = [
    (props: FormProps) => <Services {...props} />,
    (props: FormProps) => <Specifications {...props} />,
    (props: FormProps) => <CreateBooking {...props} />,
];

// TODO on the text Geni page we should remove the back / submit buttons maybe give more explanation

export default function Booking() {
    const [page, setPage] = useState(0);
    const [requireConsult, setRequireConsult] = useState<string>("");
    const { data: serviceData } = api.service.getAllNormalized.useQuery();
    const { data: session } = useSession();
    const notSignedIn = session === null;
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

    const arrowEffects = {
        initial: { x: 0 },
        hover: { x: 8 },
    };
    const tailEffects = {
        initial: { opacity: 0 },
        hover: { opacity: 1 },
    };

    return isMobile ? (
        notSignedIn ? (
            <>
                <div className="w-full px-5">
                    <div className="mt-20 flex h-72   overflow-hidden  rounded-3xl bg-glass text-lg text-white shadow-xl">
                        <div className="flex w-1/2 flex-col items-center justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 p-10">
                            <Image
                                src={heart}
                                alt="heart logo"
                                className="image-black-to-white h-10 w-10 object-contain"
                            />

                            <h1 className="mt-3 text-lg text-white">
                                Sign in to book an appointment!
                            </h1>

                            <div className="mt-3 flex flex-col items-center gap-1 text-purple-300">
                                <div className="rounded-full bg-white p-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 -0.5 20 20"
                                        version="1.1"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g
                                                transform="translate(-260.000000, -2759.000000)"
                                                fill="currentColor"
                                            >
                                                <g transform="translate(56.000000, 160.000000)">
                                                    <path d="M222,2612.40709 C222,2612.84565 221.729,2613.23594 221.324,2613.3787 L215,2615.60539 L215,2603.71501 L215,2603.53322 L220.676,2601.53454 C221.325,2601.3055 222,2601.80055 222,2602.50615 L222,2612.40709 Z M213,2603.71501 L213,2615.60539 L206.676,2613.3787 C206.271,2613.23594 206,2612.84565 206,2612.40709 L206,2602.50615 C206,2601.80055 206.675,2601.3055 207.324,2601.53454 L213,2603.53322 L213,2603.71501 Z M221.337,2599.11785 L214.331,2601.64444 C214.117,2601.72147 213.883,2601.72147 213.669,2601.64444 L206.663,2599.11785 C205.362,2598.64847 204,2599.6396 204,2601.05592 L204,2613.11577 C204,2613.997 204.547,2614.78065 205.36,2615.06207 L213.68,2617.94608 C213.888,2618.01797 214.112,2618.01797 214.32,2617.94608 L222.64,2615.06207 C223.453,2614.78065 224,2613.997 224,2613.11577 L224,2601.05592 C224,2599.6396 222.638,2598.64847 221.337,2599.11785 L221.337,2599.11785 Z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <h2 className="rounded-3xl bg-white px-4 py-1 text-xs">
                                    Bookings
                                </h2>
                            </div>
                        </div>
                        <div className="flex w-1/2 items-center justify-center">
                            <motion.button
                                aria-label="Sign in"
                                className=" relative mt-3 flex items-center rounded-2xl  bg-white py-[6px] pl-4 pr-8 text-base text-purple-300"
                                onClick={() => void signIn()}
                                whileTap="hover"
                                initial="initial"
                            >
                                {`Let's Go`}
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-3 top-[8px] flex h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    variants={arrowEffects}
                                >
                                    <motion.path
                                        d="M9 6L15 12L9 18"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    <motion.path
                                        d="M16 13H2v-2h13v2z"
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        variants={tailEffects}
                                    />
                                </motion.svg>
                            </motion.button>
                        </div>
                    </div>
                </div>

                <div className="mt-72 w-full ">
                    <Footer />
                </div>
            </>
        ) : (
            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="mb-5 font-grandHotel text-5xl text-white">
                    Book An Appointment
                </h1>

                <div>
                    {requireConsult ? (
                        <div className=" flex w-80 flex-col items-center justify-center gap-5 rounded-2xl bg-glass p-10 text-xl text-white shadow-xl">
                            <div>
                                {"Let's touch base before this appointment!"}
                            </div>
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

                    <div className="mb-20 mt-10 flex items-center justify-center gap-10 text-2xl text-white">
                        <motion.button
                            onClick={() => changePages(-1)}
                            className={`transform rounded-full bg-glass p-2 ${
                                page === 0 ? "text-white/30" : "text-purple-300"
                            } shadow-md transition-transform hover:scale-105 active:scale-95`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 rotate-180"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 12H18M18 12L13 7M18 12L13 17"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </motion.button>
                        {requireConsult ? (
                            <button
                                // TODO: Submit partial booking and redirect back home
                                onClick={() => console.log("")}
                                className="transform rounded-md bg-glass px-6 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                            >
                                Submit
                            </button>
                        ) : page !== form.length - 1 ? (
                            <motion.button
                                onClick={() => changePages(1)}
                                className=" flex items-center gap-6 rounded-full bg-glass p-2  text-violet-300 shadow-md"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M6 12H18M18 12L13 7M18 12L13 17"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </motion.button>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    ) : (
        <>
            {notSignedIn ? (
                <>
                    <div className="mt-20 flex h-96  w-1/2 overflow-hidden  rounded-3xl bg-glass text-lg  text-white shadow-xl desktop:w-1/3">
                        <div className="flex w-1/2 flex-col items-center justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 p-10">
                            <Image
                                src={heart}
                                alt="heart logo"
                                className="image-black-to-white h-10 w-10 object-contain"
                            />

                            <h1 className="mt-3 text-3xl text-white">
                                Sign in to book an appointment!{" "}
                            </h1>

                            <div className="mt-3 flex flex-col items-center gap-1 text-purple-300">
                                <div className="rounded-full bg-white p-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 -0.5 20 20"
                                        version="1.1"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g
                                                transform="translate(-260.000000, -2759.000000)"
                                                fill="currentColor"
                                            >
                                                <g transform="translate(56.000000, 160.000000)">
                                                    <path d="M222,2612.40709 C222,2612.84565 221.729,2613.23594 221.324,2613.3787 L215,2615.60539 L215,2603.71501 L215,2603.53322 L220.676,2601.53454 C221.325,2601.3055 222,2601.80055 222,2602.50615 L222,2612.40709 Z M213,2603.71501 L213,2615.60539 L206.676,2613.3787 C206.271,2613.23594 206,2612.84565 206,2612.40709 L206,2602.50615 C206,2601.80055 206.675,2601.3055 207.324,2601.53454 L213,2603.53322 L213,2603.71501 Z M221.337,2599.11785 L214.331,2601.64444 C214.117,2601.72147 213.883,2601.72147 213.669,2601.64444 L206.663,2599.11785 C205.362,2598.64847 204,2599.6396 204,2601.05592 L204,2613.11577 C204,2613.997 204.547,2614.78065 205.36,2615.06207 L213.68,2617.94608 C213.888,2618.01797 214.112,2618.01797 214.32,2617.94608 L222.64,2615.06207 C223.453,2614.78065 224,2613.997 224,2613.11577 L224,2601.05592 C224,2599.6396 222.638,2598.64847 221.337,2599.11785 L221.337,2599.11785 Z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <h2 className="rounded-3xl bg-white px-4 py-1 text-sm">
                                    Bookings
                                </h2>
                            </div>
                        </div>
                        <div className="flex w-1/2 items-center justify-center">
                            <motion.button
                                aria-label="Sign in"
                                className=" relative mt-3 flex items-center rounded-2xl  bg-white py-[6px] pl-4 pr-8 text-purple-300"
                                onClick={() => void signIn()}
                                whileHover="hover"
                                initial="initial"
                            >
                                {`Let's Go`}
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-3 top-[10px] flex h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    variants={arrowEffects}
                                >
                                    <motion.path
                                        d="M9 6L15 12L9 18"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    <motion.path
                                        d="M16 13H2v-2h13v2z"
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        variants={tailEffects}
                                    />
                                </motion.svg>
                            </motion.button>
                        </div>
                    </div>
                    <div className="mt-72 w-full ">
                        <Footer />
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-5">
                    <h1 className="mb-5 font-grandHotel text-8xl text-white">
                        Book An Appointment
                    </h1>

                    <div>
                        {requireConsult ? (
                            <div className="flex w-full justify-center px-5 ">
                                <div className="mt-10 flex h-72 w-2/3  overflow-hidden  rounded-3xl bg-glass text-lg text-white shadow-xl">
                                    <div className="flex w-1/2 flex-col items-center justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 p-10">
                                        <Image
                                            src={heart}
                                            alt="heart logo"
                                            className="image-black-to-white h-10 w-10 object-contain"
                                        />

                                        <h1 className="mt-3 text-lg text-white">
                                            {`Let's touch base before booking!`}
                                        </h1>

                                        <div className="mt-3 flex flex-col items-center gap-1 text-purple-300">
                                            <div className="rounded-full bg-white p-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 -0.5 20 20"
                                                    version="1.1"
                                                >
                                                    <g
                                                        stroke="none"
                                                        strokeWidth="1"
                                                        fill="none"
                                                        fillRule="evenodd"
                                                    >
                                                        <g
                                                            transform="translate(-260.000000, -2759.000000)"
                                                            fill="currentColor"
                                                        >
                                                            <g transform="translate(56.000000, 160.000000)">
                                                                <path d="M222,2612.40709 C222,2612.84565 221.729,2613.23594 221.324,2613.3787 L215,2615.60539 L215,2603.71501 L215,2603.53322 L220.676,2601.53454 C221.325,2601.3055 222,2601.80055 222,2602.50615 L222,2612.40709 Z M213,2603.71501 L213,2615.60539 L206.676,2613.3787 C206.271,2613.23594 206,2612.84565 206,2612.40709 L206,2602.50615 C206,2601.80055 206.675,2601.3055 207.324,2601.53454 L213,2603.53322 L213,2603.71501 Z M221.337,2599.11785 L214.331,2601.64444 C214.117,2601.72147 213.883,2601.72147 213.669,2601.64444 L206.663,2599.11785 C205.362,2598.64847 204,2599.6396 204,2601.05592 L204,2613.11577 C204,2613.997 204.547,2614.78065 205.36,2615.06207 L213.68,2617.94608 C213.888,2618.01797 214.112,2618.01797 214.32,2617.94608 L222.64,2615.06207 C223.453,2614.78065 224,2613.997 224,2613.11577 L224,2601.05592 C224,2599.6396 222.638,2598.64847 221.337,2599.11785 L221.337,2599.11785 Z"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>

                                            <h2 className="rounded-3xl bg-white px-4 py-1 text-xs">
                                                Bookings
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="flex w-1/2 flex-col items-center justify-center px-5 ">
                                        <div className="text-xl text-white">
                                            {` Color corrections or vivids can be more
                                            intricate than you might expect.
                                            Let's schedule a consultation!
                                            Please text me at`}
                                        </div>
                                        <div className="mt-5 rounded-3xl bg-white px-4 py-2 font-sans text-xl">
                                            <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                                (425) 241-7865
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            (form[page] as (props: FormProps) => JSX.Element)({
                                key: page,
                                serviceData,
                            })
                        )}

                        <div className="mb-20 mt-10 flex items-center justify-center gap-10 text-2xl text-white">
                            <motion.button
                                onClick={() => changePages(-1)}
                                className={`transform rounded-full bg-glass p-2 ${
                                    page === 0
                                        ? "text-white/30"
                                        : "text-purple-300"
                                } shadow-md transition-transform hover:scale-105 active:scale-95`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 rotate-180"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M6 12H18M18 12L13 7M18 12L13 17"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </motion.button>
                            {requireConsult ? (
                                <motion.button
                                    // TODO: Submit partial booking and redirect back home
                                    onClick={() => console.log("")}
                                    className=" rounded-full bg-glass p-2 text-violet-300 shadow-md "
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <g id="Interface / Check">
                                            <path
                                                id="Vector"
                                                d="M6 12L10.2426 16.2426L18.727 7.75732"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                    </svg>
                                </motion.button>
                            ) : page !== form.length - 1 ? (
                                <motion.button
                                    onClick={() => changePages(1)}
                                    className=" flex items-center gap-6 rounded-full bg-glass p-2  text-violet-300 shadow-md"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 "
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 12H18M18 12L13 7M18 12L13 17"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </motion.button>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </>
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
