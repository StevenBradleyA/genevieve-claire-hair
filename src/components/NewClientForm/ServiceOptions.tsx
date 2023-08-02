import { useState } from "react";

const defaultState: { [name: string]: boolean } = {
    haircuts: false,
    color: false,
    vivid: false,
    hb: false,
    tg: false,
};

export default function ServiceOptions() {
    const [formData, setFormData] = useState(defaultState);

    const toggle = (input: string) => {
        const newData = { ...formData };

        newData[input] = !newData[input];

        setFormData(newData);
    };

    return (
        <form>
            <div>
                Which services do you see yourself using?
                <label>(Select all that you might want)</label>
                <div>
                    <label>
                        Haircuts
                        <input
                            type="checkbox"
                            name="haircuts"
                            checked={formData.haircuts}
                            onChange={(e) => toggle(e.target.name)}
                        ></input>
                    </label>
                    <label>
                        Color
                        <input
                            type="checkbox"
                            name="color"
                            checked={formData.color}
                            onChange={(e) => toggle(e.target.name)}
                        ></input>
                    </label>
                    <label>
                        Vivid
                        <input
                            type="checkbox"
                            name="vivid"
                            checked={formData.vivid}
                            onChange={(e) => toggle(e.target.name)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label>
                        Highlights/Balayage
                        <input
                            type="checkbox"
                            name="hb"
                            checked={formData.hb}
                            onChange={(e) => toggle(e.target.name)}
                        ></input>
                    </label>
                    <label>
                        Toner/Gloss
                        <input
                            type="checkbox"
                            name="tg"
                            checked={formData.tg}
                            onChange={(e) => toggle(e.target.name)}
                        ></input>
                    </label>
                </div>
            </div>
        </form>
    );
}
