import { useSession } from "next-auth/react";
import DisplayReviews from "~/components/Reviews/Display";
import { useMobile } from "~/components/MobileContext";
import ChooseReview from "~/components/Reviews/Create/chooseReview";
import ScriptButton from "./scriptButton";
import Footer from "~/components/Footer/footer";
import Image from "next/image";
import heart from "@public/Logos/heart-logo.png";
import leftIndent from "@public/HomePage/home-left-indent.png";
import rightIndent from "@public/HomePage/home-right-indent.png";
import { motion } from "framer-motion";
export default function Reviews() {
    // TODO Give admin god power to delete a review

    const { data: session } = useSession();
    const { isMobile } = useMobile();

    return (
        <>
            <div className="flex w-full flex-col items-center">
                {isMobile ? (
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="relative mt-5 flex w-full justify-center font-archivo text-5xl text-white">
                            REVIEWS
                            <div className=" absolute right-10 flex flex-col gap-2">
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-4 w-4 object-contain ease-in hover:opacity-70"
                                />
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-4 w-4 object-contain ease-in hover:opacity-70"
                                />
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-4 w-4 object-contain ease-in hover:opacity-70"
                                />
                            </div>
                        </h1>

                        <div className="relative mt-5 flex h-12 w-full items-center justify-center bg-white">
                            <div className="overflow-hidden">
                                <motion.div
                                    className="z-40 flex items-center gap-3 font-archivo text-xl  text-black"
                                    animate={{ x: [0, -400] }}
                                    transition={{
                                        duration: 16,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    }}
                                >
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-6 w-6 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-6 w-6 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-6 w-6 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-6 w-6 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-6 w-6 object-contain"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        <div className="flex w-[400px] justify-center">
                            {session && session.user ? (
                                <ChooseReview session={session} />
                            ) : (
                                <ScriptButton />
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="relative mt-5 flex w-full justify-center font-archivo text-9xl text-white">
                            REVIEWS
                            <div className=" absolute right-20 flex flex-col gap-5">
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-6 w-6 object-contain ease-in hover:opacity-70"
                                />
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-6 w-6 object-contain ease-in hover:opacity-70"
                                />
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-6 w-6 object-contain ease-in hover:opacity-70"
                                />
                            </div>
                        </h1>
                        <div className="relative mt-5 flex h-20 w-full items-center justify-center bg-white">
                            <Image
                                src={leftIndent}
                                className=" absolute -top-[30px] left-0  w-40"
                                alt="left indent"
                            />
                            <Image
                                src={rightIndent}
                                className=" absolute -top-[30px] right-0  w-40"
                                alt="left indent"
                            />
                            <div className="absolute bottom-16 right-40 flex w-[400px] justify-center font-raleway largeLaptop:bottom-28">
                                {session && session.user ? (
                                    <ChooseReview session={session} />
                                ) : (
                                    <ScriptButton />
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <motion.div
                                    className="z-40 flex items-center gap-5 font-archivo text-4xl  text-black"
                                    animate={{ x: [0, -400] }}
                                    transition={{
                                        duration: 16,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    }}
                                >
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-8 w-8 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-8 w-8 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-8 w-8 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-8 w-8 object-contain"
                                    />
                                    <p className=" flex-shrink-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                                        tell me what you think
                                    </p>
                                    <Image
                                        alt="heart logo"
                                        src={heart}
                                        className="image-black-to-purple h-8 w-8 object-contain"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </>
                )}
                <DisplayReviews />
            </div>
            <div className="mt-[28rem] w-full">
                <Footer />
            </div>
        </>
    );
}
