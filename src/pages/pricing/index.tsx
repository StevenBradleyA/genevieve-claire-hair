export default function Pricing() {
    return (
        // todo want Geni to be able to change these prices
        <div className="absolute top-0 h-full w-full overflow-hidden bg-rose-100">
            <div className="triangle-background"></div>
            <div className="relative top-28 h-full">
                <div className="flex justify-center">
                    <div className=" mr-32 mt-80">
                        <h1 className=" text-9xl">Pricing 💅</h1>

                        <h2 className=" mt-1 w-96 text-xl">
                            *All pricing is considered a starting point and is
                            subject to change based on color usage and extra
                            time
                        </h2>
                    </div>
                    <div className="">
                        <ul className="text-4xl text-white">
                            <li className=" mb-1">Short Length H/C - $35</li>
                            <li className=" mb-1">Long Length H/C - $60</li>
                            <li className=" mb-1">Transformative H/C - $90</li>
                            <li className=" mb-1">All Over Color - $115+</li>
                            <li className=" mb-1">Roots Only- $80</li>
                            <li className=" mb-1">Partial Blonding - $170+</li>
                            <li className=" mb-1">Full Blonding - $220+</li>
                            <li className=" mb-1">
                                Vivid Colors - $135 an hour*
                            </li>
                            <li className=" mb-1">
                                Color Corrections- $150 an hour*
                            </li>
                        </ul>
                    </div>
                </div>
                <h2 className=" mt-8 flex justify-center text-2xl text-white">
                    * I do not offer Perms, Relaxers, or Keratin Smoothing
                    Treatments
                </h2>
            </div>
        </div>
    );
}
