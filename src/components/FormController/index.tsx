import { useState } from "react";
import {
    ServiceOptions,
    ColorHistory,
    ChemHair,
    CurrentColor,
    TimeSlots,
    ExtraDetails,
} from "../NewClientForm";

import { Services, ConsultMessage, Specifications } from "../NewBookingForm";

type FormCategoryType = "NewClient" | "NewBooking";

type FormTypes = {
    [key in FormCategoryType]: {
        (props: {
            page: number;
            setPage: React.Dispatch<React.SetStateAction<number>>;
        }): JSX.Element;
        displayName: string;
    }[];
};

export type FormControlProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const createComponentWithProps = (
    Component: React.FC<FormControlProps>,
    key: number
) => {
    const Wrapper = (props: FormControlProps) => (
        <Component key={key} {...props} />
    );
    Wrapper.displayName = Component.displayName ?? `FormComponent_${key}`;

    return Wrapper;
};

const forms: FormTypes = {
    NewClient: [
        createComponentWithProps(ServiceOptions, 0),
        createComponentWithProps(ColorHistory, 1),
        createComponentWithProps(ChemHair, 2),
        createComponentWithProps(CurrentColor, 3),
        createComponentWithProps(TimeSlots, 4),
        createComponentWithProps(ExtraDetails, 5),
    ],

    NewBooking: [
        createComponentWithProps(Services, 0),
        createComponentWithProps(ConsultMessage, 1),
        createComponentWithProps(Specifications, 2),
    ],
};

export default function FormController({ name }: { name: FormCategoryType }) {
    const [page, setPage] = useState(0);

    const form = forms[name];

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum < form.length && newNum >= 0) setPage(page + num);
        else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    return (
        <div>
            <div>{form[page]?.({ page, changePages })}</div>

            <div>
                <button onClick={() => changePages(-1)}>Back</button>
                <button onClick={() => changePages(1)}>Next</button>
            </div>
            {/* Submit using local storage check */}
        </div>
    );
}
