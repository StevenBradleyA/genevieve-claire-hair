import { useState } from "react";

const defaultState = {
    yes: false,
    no: false,
    keratin: false,
    waves: false,
    relaxers: false,
};

type InputNames = "yes" | "no" | "keratin" | "waves" | "relaxers";

export default function ChemHair() {
    const [formData, setFormData] = useState(defaultState);

    const toggle = (input: InputNames) => {
        const newData = { ...formData };
        newData[input] = !newData[input];

        if (newData.no === newData.yes && newData.no !== false) {
            input === "yes" ? (newData.no = false) : (newData.yes = false);
        }

        setFormData(newData);
    };

    return (
        <form>
            <div>
                Have you had any chemical treatments done on your hair?
                <div>
                    <label>
                        Yes
                        <input
                            type="checkbox"
                            name="yes"
                            checked={formData.yes}
                            onChange={() => toggle("yes")}
                        ></input>
                        <label>
                            No
                            <input
                                type="checkbox"
                                name="no"
                                checked={formData.no}
                                onChange={() => toggle("no")}
                            ></input>
                        </label>
                    </label>
                </div>
                {formData.yes && (
                    <div>
                        <label>
                            Keratin Treatment
                            <input
                                type="checkbox"
                                name="keratin"
                                checked={formData.keratin}
                                onChange={() => toggle("keratin")}
                            ></input>
                        </label>
                        <label>
                            Permanent waves
                            <input
                                type="checkbox"
                                name="waves"
                                checked={formData.waves}
                                onChange={() => toggle("waves")}
                            ></input>
                        </label>
                        <label>
                            Relaxers
                            <input
                                type="checkbox"
                                name="relaxers"
                                checked={formData.relaxers}
                                onChange={() => toggle("relaxers")}
                            ></input>
                        </label>
                    </div>
                )}
            </div>
        </form>
    );
}
