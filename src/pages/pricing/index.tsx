


export default function Pricing() {
    return (
        // todo want Geni to be able to change these prices
        <div className="bg-rose-100 absolute top-0 h-full w-full overflow-hidden">
            <div className="triangle-background"></div>
            <div className="relative top-40 h-full">
            <h1>Pricing</h1>
            <h2>
                All pricing is considered a starting point and are subject to
                change based on color usage and extra time
            </h2>
            <ul>
                <li>Short Length H/C - $35</li>
                <li>Long Length H/C - $60</li>
                <li>Transformative H/C - $90</li>
                <li>
                    All Over Color - $115+
                </li>
                    <li>Roots Only- $80</li>
                <li>Partial Blonding - $170+</li>
                <li>Full Blonding - $220+</li>
                <li>Vivid Colors - $135 an hour*</li>
                <li>Color Corrections- $150 an hour*</li>
            </ul>
            <p>
                I do not offer Perms, Relaxers, or Keratin Smoothing Treatments
            </p>

            </div>
        </div>
    );
}
