import { useEffect, useState } from "react";
import type { FormInputType } from "./Services";

type SelectionsType = Exclude<FormInputType, "Vivids" | "Color Corrections">;

type ServiceOptionType = { [key in SelectionsType]: string[] };

type DefaultStateType = { [key in SelectionsType]: number };

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
    Styling: [
        "Styling",
        "Special Event - Prom, Homecoming, Senior pics, Formal",
        "Bridal/Wedding",
        "Unsure",
    ],
    Quiet: ["Music", "No Music", "Either"],
};

const defaultState: DefaultStateType = {
    Haircut: -1,
    "All Over Color": -1,
    Blonding: -1,
    Styling: -1,
    Quiet: -1,
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
            const specObj = JSON.parse(specifications) as DefaultStateType;
            for (const option in specObj) {
                console.log(selections);
                if (
                    selections &&
                    !selections.includes(option as SelectionsType)
                ) {
                    console.log("hey", selections, option);
                    specObj[option as SelectionsType] = -1;
                }
            }
            localStorage.setItem("Specifications", JSON.stringify(specObj));
            setSubSelections(specObj);
        }
    }, [selections]);

    const toggle = (service: SelectionsType, choice: number) => {
        const newSelections = { ...subSelections };
        newSelections[service] = choice;

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
                            {serviceOptions[service].map((option, choice) => {
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
                                                choice
                                            }
                                            onChange={() =>
                                                toggle(service, choice)
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
