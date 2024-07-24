import Image from "next/image";
import lsp1 from "@public/HomePage/1.png";
import lsp2 from "@public/HomePage/2.png";
import lsp3 from "@public/HomePage/3.png";
import holo from "@public/HomePage/geniWithText.png";
import geni from "@public/HomePage/geni-main.png";
import { useEffect, useMemo, useState } from "react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import downArrow from "@public/svgs/angles-down-solid.svg";
import { AnimatePresence, motion } from "framer-motion";
import BookNowSvg from "~/components/HomePage/bookNowSvg";
import Footer from "~/components/Footer/footer";
import "react-day-picker/dist/style.css";
import { useRouter } from "next/router";
import leftIndent from "@public/HomePage/home-left-indent.png";
import rightIndent from "@public/HomePage/home-right-indent.png";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const images = [lsp1, lsp2, lsp3];
    const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
    const router = useRouter();
    const isHome = router.asPath === "/";

    const [bannerScriptIndex, setBannerScriptIndex] = useState(0);

    const script = useMemo(
        () => [
            "blonding",
            "vivids",
            "color correction",
            "all over color",
            "blowouts",
            "haircuts",
        ],
        []
    );

    const handleCarouselClick = (index: number): void => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };

    useEffect(() => {
        if (isHome) {
            const interval = setInterval(() => {
                setCurrentScriptIndex((prevIndex) =>
                    prevIndex === script.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isHome, script]);

    const bounceVariants = {
        initial: { opacity: 1, y: 20, rotate: 0 },
        bobble: {
            opacity: 1,
            y: [0, 10, 0],
            rotate: [0, -5, 0],
            transition: { duration: 2, yoyo: "loop", repeat: 7 },
        },
        exit: { opacity: 1, y: -20, rotate: 5 },
    };

    return (
        <div className=" flex w-full flex-col text-white">
            {/* <h1 className="-mt-10 flex w-full justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text font-archivo text-[10rem] text-transparent"> */}
            <h1 className="-mt-10 flex w-full justify-center font-archivo text-[10rem] text-white">
                GENEVIEVE CLARE
            </h1>
            <div className="flex flex-col px-32 text-2xl">
                <div className="z-40 flex w-[40%]   justify-start text-3xl">
                    {/* <div className=" bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent"> */}
                    <div className=" text-white">
                        {`Hi, I'm Geni an Issaquah based hair stylist who
                        specializes in color, low maintenance hair and giving
                        you the hair you've always wanted.`}
                    </div>
                </div>
                <div className="mt-10 flex gap-5">
                    <button className="rounded-3xl bg-purple-300 px-6 py-2 text-white ">
                        Book Now
                    </button>
                    <button className="rounded-3xl bg-white px-6 py-2 text-purple-300 ">
                        Portfolio
                    </button>
                </div>
            </div>
            <div className="relative mt-40 flex items-center ">
                <Image
                    src={leftIndent}
                    className=" absolute left-0 w-40"
                    alt="left indent"
                />
                <div className="flex h-16 w-full items-center justify-center bg-purple-300 font-archivo">
                    <div className="text-3xl text-black">
                        {" "}
                        COLOR + COLOR + COLOR + COLOR + COLOR
                    </div>
                </div>
                <Image
                    src={rightIndent}
                    className=" absolute right-0 w-40"
                    alt="left indent"
                />

                <div className="absolute left-24 rounded-full bg-purple-300 p-2 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 rotate-180 text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6 12H18M18 12L13 7M18 12L13 17"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
                <div className="absolute right-24 rounded-full bg-purple-300 p-2 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10  text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6 12H18M18 12L13 7M18 12L13 17"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
            {/* <div className="flex w-full justify-between ">
                <div className="flex h-1/3 w-2/3 flex-col items-center p-10">
                    <div
                        className="flex w-full rounded-2xl bg-lightPurple p-4 "
                        style={{
                            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Spline scene="https://draft.spline.design/IyXwTM8Xes7VfH7t/scene.splinecode" />
                    </div>
                    <motion.div
                        className="mt-20 flex items-center gap-2"
                        initial="initial"
                        animate="bobble"
                        exit="exit"
                        variants={bounceVariants}
                    >
                        <div className="text-4xl">scroll down </div>
                        <Image
                            src={downArrow as string}
                            alt="down arrow"
                            className="w-6"
                        />
                    </motion.div>
                </div>
                <div className="relative h-1/2 w-1/3 ">
                    <Image
                        src={geni}
                        alt="geni"
                        width={geni.width}
                        height={geni.height}
                        className=" w-full object-cover "
                        style={{ borderBottomLeftRadius: "30px" }}
                        priority={true}
                    />
                    <Link
                        href="/bookings"
                        className="absolute -bottom-40 left-5"
                    >
                        <BookNowSvg />
                    </Link>
                </div>
            </div> */}
            <div className="relative mt-[40rem] flex w-full">
                <div className=" relative flex h-96 w-3/4">
                    {images.map((image, index) => {
                        const distanceFromCenter = index - currentIndex;
                        let translateX = 0;
                        if (distanceFromCenter === 0) {
                            translateX = -33;
                        } else if (
                            distanceFromCenter === 1 ||
                            distanceFromCenter === -2
                        ) {
                            translateX = 50;
                        } else if (
                            distanceFromCenter === -1 ||
                            distanceFromCenter === 2
                        ) {
                            translateX = -50;
                        }

                        const zIndex = distanceFromCenter === 0 ? 1 : 0;
                        const scale = distanceFromCenter === 0 ? 1 : 0.8;
                        const opacity = scale === 1 ? 1 : 0.4;

                        return (
                            <Image
                                key={index}
                                src={image}
                                width={600}
                                height={600}
                                alt={`review photo ${index + 1}`}
                                className={` w-1/3 cursor-pointer transition-transform duration-300 ${
                                    distanceFromCenter === 0 ? "active" : ""
                                }`}
                                style={{
                                    transform: `translateX(${translateX}%) scale(${scale})`,
                                    zIndex,
                                    opacity,
                                    position: "absolute",
                                    left: "50%",
                                    top: "0%",
                                    marginLeft:
                                        distanceFromCenter === 0
                                            ? "-9%"
                                            : "-20%",
                                    transformOrigin: "center center",
                                }}
                                onClick={() => handleCarouselClick(index)}
                            />
                        );
                    })}
                </div>

                <div className="full:right-28 full:top-20 full:w-1/3 full:text-6xl absolute flex items-center justify-center sm:right-5 sm:top-12 sm:w-2/5  sm:text-5xl ">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="portfolio-button"
                    >
                        <Link href="/portfolio" aria-label="Portfolio">
                            You&apos;re&nbsp;
                            <span className="portfolio-button-span text-violet-300">
                                pretty
                            </span>{" "}
                            when you get here,&nbsp;
                            <span className="portfolio-button-span text-violet-300">
                                prettier
                            </span>
                            &nbsp;when you leave
                        </Link>
                    </motion.button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div className="flex w-full justify-center">
                    <motion.div
                        key={currentScriptIndex}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 1 }}
                        className="mt-20 flex w-2/3 justify-center text-8xl"
                    >
                        {script[currentScriptIndex]}
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <h1 className="mt-44 flex justify-center text-8xl">
                hi, im geni and I do hair stuff
            </h1>
            <div className="mt-20 flex w-full justify-center gap-20 ">
                <div className="w-1/2 flex-shrink-0 rounded-3xl bg-darkGlass p-10 text-4xl shadow-lg">
                    Genevieve (Geni) Evanson is a hairstylist based out of
                    Bellevue, Washington and has been styling hair
                    professionally since 2017. <br />
                    <br />
                    Whilst she completed cosmetology school in Washington, she
                    went through specialized training in Dallas, Texas. After
                    her move back to Washington in 2020, Geni took on the
                    daunting task of covid color corrections. During this time,
                    she became an expert at being able to match the color,
                    style, and flow of ones hair to the person; not the trends.
                    <br />
                    <br />
                    Geni has always believed that your hair should be a
                    reflection of who you are, not always what&apos;s popular.
                    With extensive experience in carving and sculpting hair in
                    her cutting techniques, Geni finds great joy in all things
                    hair.
                </div>
                <div className="w-1/3 overflow-hidden">
                    <Image
                        src={holo}
                        alt="geni"
                        width={600}
                        height={600}
                        className="rounded-3xl object-cover"
                    />
                </div>
            </div>

            <div className="my-20 flex w-full justify-center text-6xl">
                <div className="w-2/3">
                    Picture your
                    <span className="text-violet-300">{` dream `}</span>
                    look, and let Genevieve Clare Hair make that
                    <span className="text-violet-300">{` dream `}</span> your
                    reality.
                </div>
            </div>
            <Footer />
        </div>
    );
}
