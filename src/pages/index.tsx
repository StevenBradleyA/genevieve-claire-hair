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
import heart from "@public/Logos/heart-logo.png";
export default function Home() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const images = [lsp1, lsp2, lsp3];
    const router = useRouter();
    const isHome = router.asPath === "/";

    const bannerScriptWords = [
        "COLOR",
        "BLONDING",
        "LOW\u00A0MAINTENANCE",
        "HAIRCUTS",
    ];
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
    const [currentScriptIndex, setCurrentScriptIndex] = useState(0);

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
            <h1 className="mt-5 flex w-full justify-center font-archivo text-5xl text-white laptop:text-[7rem] desktop:text-[10rem]">
                GENEVIEVE CLARE
            </h1>
            <div className="mt-10 flex w-full justify-between px-32 text-2xl">
                <div className="z-40 flex w-[40%]   flex-col justify-start text-3xl">
                    <div className=" text-white">
                        {`Hi, I'm Geni an Issaquah based hair stylist who
                        specializes in color, low maintenance hair and giving
                        you the hair you've always wanted.`}
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

                <div className="mt-20 flex flex-col gap-10">
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
            </div>
            <div className="relative mt-40 flex items-center ">
                <Image
                    src={leftIndent}
                    className=" absolute left-0 z-20 w-40"
                    alt="left indent"
                />
                <div className="flex h-16 w-full items-center justify-center overflow-hidden bg-purple-300 font-archivo ">
                    <motion.div
                        className="flex flex-nowrap items-center justify-center gap-5 text-4xl text-black"
                        animate={{ x: [0, -200] }}
                        transition={{
                            duration: 8,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    >
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                        {bannerScriptWords[bannerScriptIndex]}
                        <Image
                            alt="heart logo"
                            src={heart}
                            className="h-8 w-8 object-contain"
                        />
                    </motion.div>
                </div>
                <Image
                    src={rightIndent}
                    className=" absolute right-0 z-20 w-40"
                    alt="left indent"
                />

                <button
                    className="absolute left-24 z-30 rounded-full bg-purple-300 p-2 ease-in hover:opacity-70"
                    onClick={() => {
                        if (bannerScriptIndex === 0) {
                            setBannerScriptIndex(3);
                        } else {
                            setBannerScriptIndex((prev) => prev - 1);
                        }
                    }}
                >
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
                </button>
                <button
                    className="absolute right-24 z-30 rounded-full bg-purple-300 p-2 ease-in hover:opacity-70"
                    onClick={() => {
                        setBannerScriptIndex(
                            (prev) => (prev + 1) % bannerScriptWords.length
                        );
                    }}
                >
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
                </button>
            </div>
            <div className="mt-20 flex w-full justify-between px-20 text-3xl">
                <div>clients 200+ corrections</div>
                <div className="flex gap-5">
                    <a
                        href="https://www.instagram.com/genevieveclare.hair/"
                        target="_blank"
                        aria-label="Visit Genevieve Clare Hair on Instagram"
                        className="rounded-full border-2 border-white p-2 ease-in hover:border-purple-300 hover:text-purple-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 "
                            viewBox="0 0 20 20"
                            version="1.1"
                        >
                            <g id="Page-1" fill="none" fillRule="evenodd">
                                <g
                                    transform="translate(-340.000000, -7439.000000)"
                                    fill="currentColor"
                                >
                                    <g transform="translate(56.000000, 160.000000)">
                                        <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>

                    <Link
                        href="/bookings"
                        aria-label="Book a hair appointment with Geni"
                        className="rounded-full border-2 border-white p-2 ease-in hover:border-purple-300 hover:text-purple-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 -0.5 20 20"
                            version="1.1"
                        >
                            <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <g
                                    transform="translate(-260.000000, -2759.000000)"
                                    fill="currentColor"
                                >
                                    <g transform="translate(56.000000, 160.000000)">
                                        <path d="M222,2612.40709 C222,2612.84565 221.729,2613.23594 221.324,2613.3787 L215,2615.60539 L215,2603.71501 L215,2603.53322 L220.676,2601.53454 C221.325,2601.3055 222,2601.80055 222,2602.50615 L222,2612.40709 Z M213,2603.71501 L213,2615.60539 L206.676,2613.3787 C206.271,2613.23594 206,2612.84565 206,2612.40709 L206,2602.50615 C206,2601.80055 206.675,2601.3055 207.324,2601.53454 L213,2603.53322 L213,2603.71501 Z M221.337,2599.11785 L214.331,2601.64444 C214.117,2601.72147 213.883,2601.72147 213.669,2601.64444 L206.663,2599.11785 C205.362,2598.64847 204,2599.6396 204,2601.05592 L204,2613.11577 C204,2613.997 204.547,2614.78065 205.36,2615.06207 L213.68,2617.94608 C213.888,2618.01797 214.112,2618.01797 214.32,2617.94608 L222.64,2615.06207 C223.453,2614.78065 224,2613.997 224,2613.11577 L224,2601.05592 C224,2599.6396 222.638,2598.64847 221.337,2599.11785 L221.337,2599.11785 Z"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </Link>
                    <Link
                        href="/reviews"
                        aria-label="Read Reviews about Geni"
                        className="rounded-full border-2 border-white p-2 ease-in hover:border-purple-300 hover:text-purple-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                    <a
                        href="mailto:genevieveclarehair@outlook.com"
                        aria-label="Email Genevieve Clare Hair"
                        className="rounded-full border-2 border-white p-2 hover:border-purple-300 hover:text-purple-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            <div className="relative mt-20 flex h-32 items-center justify-center bg-white">
                <h2 className="mt-10 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text font-archivo text-9xl text-transparent">
                    BE UNIQUELY YOU
                </h2>
                <Image
                    src={leftIndent}
                    className=" absolute -top-[30px] left-0 z-20 w-40"
                    alt="left indent"
                />
                <Image
                    src={rightIndent}
                    className=" absolute -top-[30px] right-0 z-20 w-40"
                    alt="left indent"
                />
            </div>

            <div className="flex flex-col gap-10 bg-white px-10 py-10 pb-20">
                <div className="flex gap-10">
                    <div className="relative flex h-[35rem] w-1/3 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-200 to-lightPurple p-10">
                        <button className="absolute right-5 top-5 z-30 rounded-full bg-purple-300 p-2 ease-in hover:opacity-70">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 -rotate-45  text-white"
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
                        </button>

                        <p className="text-3xl">{`I've always believed that your hair should be a
                        reflection of who you are, not always what's popular `}</p>
                    </div>
                    <div className="h-[35rem] w-2/3 overflow-hidden rounded-3xl">
                        <Spline scene="https://draft.spline.design/IyXwTM8Xes7VfH7t/scene.splinecode" />
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="flex h-[30rem] w-2/3 items-center justify-center rounded-3xl bg-gradient-to-r from-lightPurple to-blue-200">
                        <div className=" relative mt-20 flex h-96 w-full ">
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
                                const scale =
                                    distanceFromCenter === 0 ? 1 : 0.8;
                                const opacity = scale === 1 ? 1 : 0.4;

                                return (
                                    <Image
                                        key={index}
                                        src={image}
                                        width={600}
                                        height={600}
                                        alt={`review photo ${index + 1}`}
                                        className={` w-1/3 cursor-pointer rounded-2xl object-cover transition-transform duration-300 ${
                                            distanceFromCenter === 0
                                                ? "active"
                                                : ""
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
                                        onClick={() =>
                                            handleCarouselClick(index)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="relative h-[30rem] w-1/3 rounded-3xl bg-gradient-to-l from-lightPurple to-blue-200">
                        <button className="absolute right-5 top-5 z-30 rounded-full bg-purple-300 p-2 ease-in hover:opacity-70">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 -rotate-45  text-white"
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
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="mt-20 flex w-full justify-between px-20">
                <div>{`You're pretty when you get here, prettier when you leave`}</div>

                <div className=" flex  w-2/3 overflow-hidden rounded-3xl bg-lightPurple shadow-xl">
                    <Spline scene="https://draft.spline.design/IyXwTM8Xes7VfH7t/scene.splinecode" />
                </div>
            </div> */}

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
            {/* <div className="relative mt-[40rem] flex w-full">
             */}
            {/* </div> */}

            {/* <AnimatePresence mode="wait">
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
            </AnimatePresence> */}

            {/* <h1 className="mt-44 flex justify-center text-8xl">
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
            </div> */}

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
