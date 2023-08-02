import { useState } from "react";
import ServiceOptions from "../NewClientForm/ServiceOptions";
import ColorHistory from "../NewClientForm/ColorHistory";
import ChemHair from "../NewClientForm/ChemHair";

const NewClient = [
    <ServiceOptions key={0} />,
    <ColorHistory key={1} />,
    <ChemHair key={2} />,
];

export default function FormController() {
    const [page, setPage] = useState(0);

    const form = NewClient;

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum < form.length && newNum >= 0) setPage(page + num);
        else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    return (
        <div>
            <div>{form[page]}</div>

            <div>
                <button onClick={() => changePages(-1)}>Back</button>
                <button onClick={() => changePages(1)}>Next</button>
            </div>
            {/* Submit using local storage check */}
        </div>
    );
}
