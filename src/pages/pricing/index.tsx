export default function Pricing() {
    return (
        // todo want Geni to be able to change these prices
        // todo needs mobile text adjustments. sm: is affecting all screen sizes for some reason

        <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0 scale-150 transform bg-white opacity-20 blur-3xl filter"></div>

            <div className="flex justify-center  ">
                <div className=" mr-48 mt-10">
                    <h1 className=" text-9xl">Pricing 💅</h1>

                    <h2 className=" mt-1 w-96 text-2xl">
                        *All prices are considered a starting point and are
                        subject to change based on color usage and extra time
                    </h2>
                    <h2 className=" mt-10 w-96 text-lg text-white">
                        I do not offer
                    </h2>
                    <h2 className=" mt-1 w-96 text-lg text-white">
                        Permanent services such as perms, relaxers, or keratin
                        smoothing services.
                    </h2>
                    <h2 className=" mt-1 w-96 text-lg text-white">
                        Hand tied, beaded, and/or fusion bonded extensions.
                        Treatments
                    </h2>
                </div>
                <ul className="mt-32  text-4xl text-white">
                    <li className=" mb-1">Short Length H/C - $35</li>
                    <li className=" mb-1">Long Length H/C - $60</li>
                    <li className=" mb-1">Transformative H/C - $90</li>
                    <li className=" mb-1">All Over Color - $115+</li>
                    <li className=" mb-1">Roots Only- $80</li>
                    <li className=" mb-1">Partial Blonding - $170+</li>
                    <li className=" mb-1">Full Blonding - $220+</li>
                    <li className=" mb-1">Vivid Colors - $135 an hour*</li>
                    <li className=" mb-1">Color Corrections- $150 an hour*</li>
                </ul>
            </div>
            <h2 className=" mt-8 flex justify-center text-2xl text-white">
                * Deposit of 2 hours required upon booking. Non-Refundable will go towards your final total
            </h2>
        </div>
    );
}
