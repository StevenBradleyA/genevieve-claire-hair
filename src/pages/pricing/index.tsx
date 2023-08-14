import { motion } from "framer-motion";
import Image from "next/image";
import colorLogo from "../../../public/color-logo.png";

export default function Pricing() {
    // todo want Geni to be able to change these prices
    // todo needs mobile text adjustments. sm: is affecting all screen sizes for some reason

    const pageVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="w-3/4">
            <motion.div
                className="relative h-full overflow-hidden p-5 md:p-20"
                initial="hidden"
                animate="visible"
                variants={pageVariants}
            >
                <div className="blurblur absolute inset-0"></div>

                <div className="relative flex h-full items-center justify-center">
                    <div className=" relative mr-48 mt-10">
                        <div className="flex items-center ">
                            <h1 className=" text-9xl text-purple-300">
                                Pricing
                            </h1>
                            <Image
                                src={colorLogo}
                                height={colorLogo.height}
                                width={colorLogo.width}
                                alt="pricing"
                                className="relative right-20 w-96 object-cover"
                            />
                        </div>

                        <h2 className=" text-image mt-1 w-96 text-2xl">
                            +All prices are considered a starting point and are
                            subject to change based on color usage and extra
                            time
                        </h2>
                        <h2 className=" text-image mt-10 w-96 text-lg">
                            I do not offer
                        </h2>
                        <h2 className=" text-image mt-1 w-96 text-lg">
                            Permanent services such as perms, relaxers, or
                            keratin smoothing services.
                        </h2>
                        <h2 className=" text-image mt-1 w-96 text-lg">
                            Hand tied, beaded, and/or fusion bonded extensions.
                            Treatments
                        </h2>
                    </div>
                    <ul className="mt-32  text-4xl text-white">
                        <li className=" text-image mb-1">
                            Short Length H/C - $35
                        </li>
                        <li className=" text-image mb-1">
                            Long Length H/C - $60
                        </li>
                        <li className=" text-image mb-1">
                            Transformative H/C - $90
                        </li>
                        <li className=" text-image mb-1">
                            All Over Color - $115+
                        </li>
                        <li className=" text-image mb-1 ml-12 text-3xl">Roots Only- $80</li>
                        <li className=" text-image mb-1">
                            Partial Blonding - $170+
                        </li>
                        <li className=" text-image mb-1">
                            Full Blonding - $220+
                        </li>
                        <li className=" text-image mb-1">
                            Vivid Colors - $135 an hour*
                        </li>
                        <li className=" text-image mb-1">
                            Color Corrections- $150 an hour*
                        </li>
                    </ul>
                </div>
                <h2 className="relative mt-8 flex justify-center text-2xl text-purple-300">
                    * Deposit of 2 hours required upon booking. Non-Refundable
                    will go towards your final total
                </h2>
            </motion.div>
        </div>
    );
}
