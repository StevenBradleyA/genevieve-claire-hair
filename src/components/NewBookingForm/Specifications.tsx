import { useEffect, useState } from "react";
import type { FormInputType } from "./Services";

export type SelectionsType = Exclude<FormInputType, "Vivids" | "Color Corrections">;

type ServiceOptionType = { [key in SelectionsType]: string[] };

export type SpecificationsType = { [key in SelectionsType]: string } & {
    ready: boolean;
};

const serviceOptions: ServiceOptionType = {
    Haircut: ["Buzz", "Short", "Long", "Creative", "Unsure"],
    "All Over Color": [
        "Gloss and toner only",
        "Roots only",
        "Roots to ends",
        "Unsure",
    ],
    Blonding: [
        "Highlights",
        "Balayage",
        "Baby lights",
        "Bleach and tone",
        "Unsure",
    ],
    Styling: ["Styling", "Special Event", "Bridal/Wedding", "Unsure"],
    Quiet: ["Music", "No Music", "Either"],
};

const defaultState: SpecificationsType = {
    Haircut: "",
    "All Over Color": "",
    Blonding: "",
    Styling: "",
    Quiet: "",
    ready: false,
};

const Specifications = () => {
    const [selections, setSelections] = useState<SelectionsType[]>();
    const [subSelections, setSubSelections] = useState(defaultState);

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
                if (
                    option !== "ready" &&
                    selections &&
                    !selections.includes(option as SelectionsType)
                ) {
                    specObj[option as SelectionsType] = "";
                }
            }

            if (selections && selections.some((el) => !specObj[el])) {
                specObj.ready = false;
            } else specObj.ready = true;

            localStorage.setItem("Specifications", JSON.stringify(specObj));
            setSubSelections(specObj);
        }
    }, [selections]);

    const toggle = (service: SelectionsType, choice: string) => {
        const newSelections = { ...subSelections };
        newSelections[service] = choice;

        if (selections && selections.some((el) => !newSelections[el])) {
            newSelections.ready = false;
        } else newSelections.ready = true;

        localStorage.setItem("Specifications", JSON.stringify(newSelections));
        setSubSelections(newSelections);
    };

    if (selections) {
        return (
            <div className="flex flex-col text-3xl">
                {selections.map((service) => {
                    return (
                        <div key={service}>
                            {service}
                            {serviceOptions[service].map((option) => {
                                return (
                                    <label
                                        key={option}
                                        className="flex cursor-pointer items-center gap-5 text-xl"
                                    >
                                        {option}
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
