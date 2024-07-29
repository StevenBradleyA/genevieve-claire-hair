import { motion } from "framer-motion";
import Image from "next/image";
import colorLogo from "../../../public/icons/color-logo.png";
import { useMobile } from "~/components/MobileContext";
import { api } from "~/utils/api";
import { DotLoader } from "react-spinners";
import type { PricesType } from "~/server/api/routers/service";
import Footer from "~/components/Footer/footer";

export default function Pricing() {
    const { isMobile } = useMobile();

    const pageVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const { data, isLoading } = api.service.getPrices.useQuery();

    if (isLoading || !data)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    const pricingData: PricesType = data;

    return isMobile ? (
        <>
            <div className="flex w-11/12 flex-col rounded-2xl  bg-glass p-5 shadow-xl">
                <div className="flex items-center justify-center gap-5">
                    <h1 className="flex text-6xl text-purple-300">Pricing</h1>
                    <Image
                        src={colorLogo}
                        height={colorLogo.height}
                        width={colorLogo.width}
                        alt="pricing"
                        className="h-24 w-24 object-cover"
                    />
                </div>
                <div className="flex justify-between">
                    <div className="mb-5 flex w-1/2 flex-col p-2 text-[10px]">
                        <h2 className=" holo-gradient-text mb-3">
                            +All prices are considered a starting point and are
                            subject to change based on color usage and extra
                            time
                        </h2>
                        <h2 className=" holo-gradient-text mb-1">
                            I do not offer
                        </h2>
                        <h2 className=" holo-gradient-text mt-1">
                            Permanent services such as perms, relaxers, or
                            keratin smoothing services.
                        </h2>
                        <h2 className=" holo-gradient-text mt-1">
                            Hand tied, beaded, and/or fusion bonded extensions.
                            Treatments
                        </h2>
                    </div>
                    <ul className=" mb-3 w-1/2 rounded-2xl bg-glass p-2 text-[11px] text-white shadow-md">
                        <li className=" holo-gradient-text mb-1">
                            Short Length H/C - ${" "}
                            <span>
                                <span>{pricingData.Haircut.Short}</span>
                            </span>
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Long Length H/C - $
                            <span>{pricingData.Haircut.Long}</span>
                        </li>

                        <li className=" holo-gradient-text mb-1">
                            All Over Color - $
                            <span>
                                {pricingData["All Over Color"]["Roots to ends"]}
                            </span>
                            +
                        </li>
                        <li className=" holo-gradient-text mb-1 ml-5">
                            Roots Only - $
                            <span>
                                {pricingData["All Over Color"]["Roots only"]}
                            </span>
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Partial Blonding - $
                            <span>{pricingData.Blonding.Partial}</span>+
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Full Blonding - ${" "}
                            <span>{pricingData.Blonding.Full}</span>+
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Vivid Colors - $<span>{pricingData.Vivids}</span> an
                            hour*
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Color Corrections - $
                            <span>{pricingData["Color Corrections"]}</span> an
                            hour*
                        </li>
                    </ul>
                </div>
                <h2 className="flex justify-center text-[10px] text-purple-300">
                    * Deposit of 2 hours required upon booking. Non-Refundable
                    will go towards your final total
                </h2>
            </div>
            <div className="mt-40 w-full">
                <Footer />
            </div>
        </>
    ) : (
        <>
            <motion.div
                className="full:w-2/3 mx-10 flex flex-col rounded-3xl bg-glass p-10 text-xl shadow-2xl laptop:text-4xl desktop:mt-16 ultrawide:w-1/2"
                initial="hidden"
                animate="visible"
                variants={pageVariants}
            >
                <div className="flex justify-between">
                    <div className="flex justify-between">
                        <div className="mb-5 flex flex-col text-base laptop:text-lg">
                            <h1 className=" mb-1 flex  text-9xl text-purple-300">
                                Pricing
                            </h1>

                            <h2 className=" holo-gradient-text mb-5 w-96 text-lg laptop:text-2xl">
                                +All prices are considered a starting point and
                                are subject to change based on color usage and
                                extra time
                            </h2>
                            <h2 className=" holo-gradient-text mb-5 w-96 ">
                                I do not offer
                            </h2>
                            <h2 className=" holo-gradient-text mt-1 w-96 ">
                                Permanent services such as perms, relaxers, or
                                keratin smoothing services.
                            </h2>
                            <h2 className=" holo-gradient-text mt-1 w-96 ">
                                Hand tied, beaded, and/or fusion bonded
                                extensions. Treatments
                            </h2>
                        </div>
                        <Image
                            src={colorLogo}
                            height={colorLogo.height}
                            width={colorLogo.width}
                            alt="pricing"
                            className="relative bottom-10 h-60 w-60 object-cover opacity-0 laptop:opacity-100 "
                        />
                    </div>
                    <ul className="z-20 mt-10  text-white">
                        <li className=" holo-gradient-text mb-1">
                            Short Length H/C - $
                            <span>{pricingData.Haircut.Short}</span>
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Long Length H/C - $
                            <span>{pricingData.Haircut.Long}</span>
                        </li>

                        <li className=" holo-gradient-text mb-1">
                            All Over Color - $
                            <span>
                                {pricingData["All Over Color"]["Roots to ends"]}
                            </span>
                            +
                        </li>
                        <li className=" holo-gradient-text mb-1 ml-12 text-lg laptop:text-3xl">
                            Roots Only - $
                            <span>
                                {pricingData["All Over Color"]["Roots only"]}
                            </span>
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Partial Blonding - $
                            <span>{pricingData.Blonding.Partial}</span>+
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Full Blonding - $
                            <span>{pricingData.Blonding.Full}</span>+
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Vivid Colors - $<span>{pricingData.Vivids}</span> an
                            hour*
                        </li>
                        <li className=" holo-gradient-text mb-1">
                            Color Corrections - $
                            <span>{pricingData["Color Corrections"]}</span> an
                            hour*
                        </li>
                    </ul>
                </div>
                <h2 className=" mt-8 flex justify-center text-lg text-purple-300 laptop:text-2xl">
                    * Deposit of 2 hours required upon booking. Non-Refundable
                    will go towards your final total
                </h2>
            </motion.div>
            <div className="mt-96 w-full">
                <Footer />
            </div>
        </>
    );
}
