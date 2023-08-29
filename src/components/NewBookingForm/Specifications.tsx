import { useEffect, useState } from "react";
import type { FormInputType } from "./Services";
import { useMobile } from "../MobileContext";

export type SelectionsType = Exclude<
    FormInputType,
    "Vivids" | "Color Corrections"
>;

type ServiceOptionType = { [key in SelectionsType]: string[] };

export type SpecificationsType = { [key in SelectionsType]: string };

// TODO: Geni orders by price and time
const serviceOptions: ServiceOptionType = {
    Blonding: ["Partial", "Full"],
    "All Over Color": ["Gloss and toner only", "Roots only", "Roots to ends"],
    Haircut: ["Buzz", "Short", "Long", "Creative"],
    Styling: ["Blowout", "Special Event", "Bridal/Wedding"],
    Quiet: ["Music", "No Music", "Either"],
};

const defaultState: SpecificationsType = {
    Blonding: "",
    "All Over Color": "",
    Haircut: "",
    Styling: "",
    Quiet: "",
};

const Specifications = () => {
    const [selections, setSelections] = useState<SelectionsType[]>();
    const [subSelections, setSubSelections] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const services = localStorage.getItem("Services");

        if (services) {
            const choicesObj = JSON.parse(services) as ServiceOptionType;
            const choicesArr = Object.keys(choicesObj) as SelectionsType[];

            setSelections(choicesArr.filter((el) => choicesObj[el]));
        }
    }, []);

    useEffect(() => {
        const specifications = localStorage.getItem("Specifications");
        if (specifications) {
            const specObj = JSON.parse(specifications) as SpecificationsType;
            for (const option in specObj) {
                console.log(selections, "\n\nheywowowow");
                if (
                    selections &&
                    !selections.includes(option as SelectionsType)
                ) {
                    specObj[option as SelectionsType] = "";
                }
            }

            localStorage.setItem("Specifications", JSON.stringify(specObj));
            setSubSelections(specObj);
        }
    }, [selections]);

    const toggle = (service: SelectionsType, choice: string) => {
        const newSelections = { ...subSelections };
        newSelections[service] = choice;

        localStorage.setItem("Specifications", JSON.stringify(newSelections));
        setSubSelections(newSelections);
    };

    if (selections) {
        return isMobile ? (
            <div className="flex w-80 flex-col items-center rounded-2xl bg-glass p-10 text-xl text-white shadow-lg">
                {selections.map((service) => {
                    return (
                        <div
                            key={service}
                            className="mb-5 flex flex-col text-4xl"
                        >
                            {service}
                            {serviceOptions[service].map((option) => {
                                return (
                                    <label
                                        key={option}
                                        className="flex cursor-pointer items-center justify-center gap-5 text-lg"
                                    >
                                        <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                            {option}
                                        </span>
                                        <input
                                            className="custom-checkbox"
                                            type="checkbox"
                                            checked={
                                                subSelections[service] ===
                                                option
                                            }
                                            onChange={() =>
                                                toggle(service, option)
                                            }
                                        ></input>
                                    </label>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="flex flex-col items-center rounded-2xl bg-glass p-10 text-3xl text-white shadow-lg">
                {selections.map((service) => {
                    return (
                        <div
                            key={service}
                            className="mb-5 flex flex-col text-6xl"
                        >
                            {service}
                            {serviceOptions[service].map((option) => {
                                return (
                                    <label
                                        key={option}
                                        className="flex cursor-pointer items-center justify-center gap-5 text-xl"
                                    >
                                        <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                            {option}
                                        </span>
                                        <input
                                            className="custom-checkbox"
                                            type="checkbox"
                                            checked={
                                                subSelections[service] ===
                                                option
                                            }
                                            onChange={() =>
                                                toggle(service, option)
                                            }
                                        ></input>
                                    </label>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    return <div></div>;
};

export default Specifications;
