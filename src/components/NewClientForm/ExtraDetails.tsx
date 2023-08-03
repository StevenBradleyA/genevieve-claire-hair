import { useState } from "react";

export default function ExtraDetails() {
    const [formData, setFormData] = useState("");

    return (
        <form>
            <div>
                {"Anything you'd like me to know?"}
                <label>
                    <input
                        value={formData}
                        onChange={(e) => setFormData(e.target.value)}
                    ></input>
                </label>
            </div>
        </form>
    );
}
