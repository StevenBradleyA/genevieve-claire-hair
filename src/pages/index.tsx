import Image from "next/image";
import lsp1 from "@public/1.png";
import lsp2 from "@public/2.png";
import lsp3 from "@public/3.png";
import holo from "@public/geniWithText.png";
import geni from "@public/landing/geni-test.png";
import giraffe from "@public/giraffe.png";
import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import downArrow from "@public/svgs/angles-down-solid.svg";
import { AnimatePresence, motion } from "framer-motion";
import BookNowSvg from "~/components/HomePage/bookNowSvg";
import { useInView } from "react-intersection-observer";
import Footer from "~/components/HomePage/footer";

export default function Home() {
    //Todo set script switch only on homepage and at a certain scroll range

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const images = [lsp1, lsp2, lsp3];
    const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
    const script = [
        "blonding",
        "vivids",
        "color correction",
        "all over color",
        "blowouts",
        "haircuts",
    ];

    const handleCarouselClick = (index: number): void => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView) {
            const interval = setInterval(() => {
                setCurrentScriptIndex((prevIndex) =>
                    prevIndex === script.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [inView]);

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
        <div className=" flex w-full flex-col items-center overflow-x-hidden  text-white">
            <div className="flex w-full justify-between ">
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
                    />

                    <Link
                        href="/bookings"
                        className="absolute -bottom-40 left-5"
                    >
                        <BookNowSvg />
                    </Link>
                </div>
            </div>
            <div className="relative mt-32 flex w-full">
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

                <div className="absolute flex items-center justify-center sm:right-5 sm:top-12 sm:w-2/5 sm:text-5xl full:right-28 full:top-20 full:w-1/3  full:text-6xl ">
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
                <motion.div
                    key={currentScriptIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 1 }}
                    className="mt-20 text-8xl"
                    ref={ref}
                >
                    {script[currentScriptIndex]}
                </motion.div>
            </AnimatePresence>

            <h1 className="m-20 mt-44 text-8xl">
                hi, im geni and I do hair stuff
            </h1>
            <div className="mb-32 flex p-10  ">
                <div className=" mx-40 flex flex-col gap-5 text-4xl">
                    <div className="rounded-3xl bg-darkGlass p-4 shadow-lg">
                        Genevieve (Geni) Evanson is a hairstylist based out of
                        Bellevue, Washington and has been styling hair
                        professionally since 2017.
                    </div>
                    <div className="rounded-3xl bg-darkGlass p-4 shadow-lg">
                        Whilst she completed cosmetology school in Washington,
                        she went through specialized training in Dallas, Texas.
                        After her move back to Washington in 2020, Geni took on
                        the daunting task of covid color corrections. During
                        this time, she became an expert at being able to match
                        the color, style, and flow of ones hair to the person;
                        not the trends.{" "}
                    </div>
                    <div className="rounded-3xl bg-darkGlass p-4 shadow-lg">
                        Geni has always believed that your hair should be a
                        reflection of who you are, not always what's popular.
                    </div>
                    <div className="rounded-3xl bg-darkGlass p-4 shadow-lg">
                        With extensive experience in carving and sculpting hair
                        in her cutting techniques, Geni finds great joy in all
                        things hair.
                    </div>
                </div>

                <Image
                    src={holo}
                    alt="geni"
                    width={600}
                    height={600}
                    className="object-cover"
                    style={{ borderRadius: "60px" }}
                />
            </div>

            <div className="mb-20 flex w-3/4 justify-center px-20">
                <div className=" text-6xl">
                    Picture your <span className="text-violet-300">dream</span>{" "}
                    look, and let Genevieve Clare Hair make that{" "}
                    <span className="text-violet-300">dream</span> your reality.
                </div>
            </div>
            <Footer />
        </div>
    );
}
