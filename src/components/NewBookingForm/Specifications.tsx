import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";
import type { FormInputType } from "./Services";
import type { NormalizedServicesType } from "~/server/api/routers/service";

export type SelectionsType = Exclude<
    FormInputType,
    "Vivids" | "Color Corrections"
>;

type ServiceOptionType = { [key in SelectionsType]: string[] };

export type SpecificationsType = { [key in SelectionsType]: string };

const defaultState: SpecificationsType = {
    Blonding: "",
    "All Over Color": "",
    Haircut: "",
    Styling: "",
    Quiet: "",
};

const Specifications = ({
    serviceData,
}: {
    serviceData: NormalizedServicesType | undefined;
}) => {
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
                            {serviceData &&
                                serviceData[service]?.subcategories.map(
                                    (option) => {
                                        return (
                                            <label
                                                key={option.name}
                                                className="flex cursor-pointer items-center justify-center gap-5 text-lg"
                                            >
                                                <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                                    {option.name}
                                                </span>
                                                <input
                                                    className="custom-checkbox"
                                                    type="checkbox"
                                                    checked={
                                                        subSelections[
                                                            service
                                                        ] === option.name
                                                    }
                                                    onChange={() =>
                                                        toggle(
                                                            service,
                                                            option.name
                                                        )
                                                    }
                                                ></input>
                                            </label>
                                        );
                                    }
                                )}
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
                            {serviceData &&
                                serviceData[service]?.subcategories.map(
                                    (option) => {
                                        return (
                                            <label
                                                key={option.name}
                                                className="flex cursor-pointer items-center justify-center gap-5 text-xl"
                                            >
                                                <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                                    {option.name}
                                                </span>
                                                <input
                                                    className="custom-checkbox"
                                                    type="checkbox"
                                                    checked={
                                                        subSelections[
                                                            service
                                                        ] === option.name
                                                    }
                                                    onChange={() =>
                                                        toggle(
                                                            service,
                                                            option.name
                                                        )
                                                    }
                                                ></input>
                                            </label>
                                        );
                                    }
                                )}
                        </div>
                    );
                })}
            </div>
        );
    }

    return <div></div>;
};

export default Specifications;
