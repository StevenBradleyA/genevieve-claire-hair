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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                <h2 className="z-10 mt-10 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text font-archivo text-9xl text-transparent">
                    BE UNIQUELY YOU
                </h2>
                <Image
                    src={leftIndent}
                    className=" absolute -top-[30px] left-0 w-40"
                    alt="left indent"
                />
                <Image
                    src={rightIndent}
                    className=" absolute -top-[30px] right-0 w-40"
                    alt="left indent"
                />
            </div>

            <div className="flex flex-col gap-10 bg-white px-10 py-10 pb-20">
                <div className="flex gap-10">
                    <div className="relative flex h-[35rem] w-1/3 flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-blue-200 to-lightPurple p-10">
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
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <p className="text-3xl">{`I've always believed that your hair should be a
                        reflection of who you are, not always what's popular `}</p>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2"
                            version="1.2"
                            baseProfile="tiny"
                            id="Layer_1"
                            viewBox="-871 873 256 256"
                        >
                            <g>
                                <circle cx="-677.7" cy="1016.6" r="16.8" />
                                <circle cx="-698.4" cy="1058.4" r="16.8" />
                                <path d="M-725.2,1078.3h-18.9H-763c-11.5,0-18.7,9.5-18.7,21.4v29.3h12.9v-25.9c0-1.2,1-2,2-2c1.2,0,2,0.8,2,2v25.8h41.5v-25.8   c0-1.2,1-2,2-2c1.2,0,2,1,2,2v25.8h12.9v-29.1C-706.2,1087.8-713.5,1078.3-725.2,1078.3z" />
                                <circle cx="-720.5" cy="1016.6" r="16.8" />
                                <path d="M-671.1,1058.4c0,9.3,7.5,16.8,16.8,16.8s16.8-7.5,16.8-16.8c0-9.3-7.5-16.8-16.8-16.8S-671.1,1049.1-671.1,1058.4z" />
                                <path d="M-672.8,1078.3c-11.5,0-18.7,9.5-18.7,21.4v29.3h12.9v-25.9c0-1.2,1-2,2-2c1.2,0,2,0.8,2,2v25.8h41.5v-25.8c0-1.2,1-2,2-2   c1.2,0,2,1,2,2v25.8h12.9v-29.1c0.2-12.1-7.1-21.6-18.7-21.6h-18.9h-19V1078.3z" />
                                <circle cx="-830.4" cy="1058.4" r="16.8" />
                                <path d="M-855.4,1128.9v-25.8c0-1.2,1-2,2-2c1.2,0,2,0.8,2,2v25.8h41.5v-25.8c0-1.2,1-2,2-2c1.2,0,2,1,2,2v25.8h12.9v-29.1   c0.2-12.1-7.1-21.6-18.7-21.6h-18.9h-18.9c-11.5,0-18.7,9.5-18.7,21.4v29.3H-855.4L-855.4,1128.9z" />
                                <path d="M-760.9,1058.4c0,9.3,7.5,16.8,16.8,16.8c9.3,0,16.8-7.5,16.8-16.8c0-9.3-7.5-16.8-16.8-16.8   C-753.4,1041.6-760.9,1049.1-760.9,1058.4z" />
                                <circle cx="-808.9" cy="1016.6" r="16.8" />
                                <circle cx="-763.5" cy="1016.6" r="16.8" />
                                <circle cx="-786.1" cy="1058.4" r="16.8" />
                            </g>
                            <path d="M-743.1,979.8c28.6,0.3,51.5-23.4,51.6-51.4c0.3-28.6-22.7-51.4-51.4-51.6c-28.7-0.2-51.5,23.4-51.6,51.4  C-794.8,956.8-771.1,979.6-743.1,979.8z M-722.6,907.8c5.1,0.3,8.8,3.9,8.6,9c-0.3,5.1-3.9,8.8-9,8.6c-5.1-0.3-8.8-3.9-8.6-9  C-731.4,911.3-727.7,907.6-722.6,907.8z M-742.9,965.8c-12.5-0.1-23.7-7.4-29.4-19.5c-1-2.4,0.3-5.1,2.6-6.1c2.4-1,5.1,0.3,6.8,2.8  c3.7,8,11.5,13.2,20.3,13.4c8.8,0.2,16.4-5,20.1-13.1c1.3-2.7,4.3-3.6,6.4-2.5c2.7,1.3,3.8,3.7,2.5,6.4  C-718.7,958.5-730.4,966-742.9,965.8z M-761.7,907.8c5.1,0.3,8.8,3.9,8.6,9c-0.3,5.1-3.9,8.8-9,8.6c-4.4-0.1-8.8-3.9-8.6-9  C-770.6,912-766.8,907.6-761.7,907.8z" />
                        </svg>
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
                    <div className="relative flex h-[30rem] w-1/3 flex-col items-start rounded-3xl bg-gradient-to-l from-lightPurple to-blue-200 p-10">
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
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <div className="rounded-full bg-white p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                id="Layer_1"
                                viewBox="0 0 512.001 512.001"
                                className="h-10 w-10 text-purple-300"
                                fill="currentColor"
                            >
                                <g>
                                    <g>
                                        <path d="M336.079,427.329c-0.718,0.029-1.703-0.157-2.426-0.157h-26.607v-0.001c-2.877,0-5.435-0.029-8.19-0.467    c-0.281,1.299-0.172,2.85-0.172,4.234v15.458c0,15.457-13.106,27.622-28.561,27.622H93.038c-11.17,0-20.258-9.088-20.258-20.258    c0-11.17,9.088-20.258,20.258-20.258h38.403c29.789,0,54.024-24.031,54.024-53.82c0-2.083-0.13-4.021-0.361-6.042    c-3.067-26.9-25.957-47.757-53.663-47.757h-12.992c-10.489,0-18.992,8.503-18.992,18.992c0,10.488,8.503,18.992,18.992,18.992    h12.992c8.845,0,16.04,6.981,16.04,15.826c0,8.845-7.197,15.826-16.04,15.826H93.038c-32.114,0-58.241,26.128-58.241,58.241    c0,32.115,26.128,58.241,58.241,58.241h177.083c36.401,0,66.544-29.204,66.544-65.605v-15.458    C336.665,429.775,336.279,428.435,336.079,427.329z" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M278.424,213.943v159.961c0,15.634,12.987,27.944,28.62,27.944h26.609c13.201,0,24.845-9.151,27.689-22.042    l34.893-158.687L278.424,213.943z" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M74.033,20.933C55.96,22.051,41.661,37.11,41.661,55.216v86.419c0,18.108,14.299,33.168,32.373,34.286l19.537,1.2V19.732    L74.033,20.933z" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M457.37,16.966C445.646,5.944,430.546,0,414.62,0c-1.323,0-2.688,0.041-4.022,0.124L118.894,18.165v160.522    l291.667,18.042c17.396,1.084,34.11-4.906,46.808-16.842c12.698-11.937,19.835-28.109,19.835-45.537V62.503    C477.204,45.075,470.068,28.903,457.37,16.966z" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="rounded-full bg-white p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="h-10 w-10 text-purple-300"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 18c4 0 5-4 5-4H7s1 4 5 4z" />
                                <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z" />
                                <path d="m8.535 12.634 2.05-2.083a1.485 1.485 0 0 0-.018-2.118 1.49 1.49 0 0 0-2.065-.034 1.488 1.488 0 0 0-2.067.068c-.586.6-.579 1.53.019 2.117l2.081 2.05zm7 0 2.05-2.083a1.485 1.485 0 0 0-.018-2.118 1.49 1.49 0 0 0-2.065-.034 1.488 1.488 0 0 0-2.068.067c-.586.6-.579 1.53.019 2.117l2.082 2.051z" />
                            </svg>
                        </div>

                        <div className="rounded-full bg-white p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="h-12 w-12 text-purple-300"
                                version="1.1"
                                id="Layer_1"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <g>
                                        <path d="M328.962,282.812V58.376V27.428C328.962,12.304,316.658,0,301.534,0h-26.461c-15.124,0-27.428,12.304-27.428,27.428    v30.947v42.863v137.789l-45.163,24.987c-3.83,2.119-6.21,6.155-6.21,10.533v19.825h-12.369v-38.376c0-1.481,0.786-2.88,2.05-3.652    l37.457-22.471c3.975-2.423,5.231-7.609,2.808-11.584c-2.423-3.975-7.61-5.23-11.584-2.808l-37.458,22.471    c-6.249,3.811-10.131,10.725-10.131,18.045V302.8v25.853c0,12.706,10.336,23.041,23.041,23.041s23.041-10.336,23.041-23.041V302.8    v-25.411l34.517-19.097v22.939c-11.556,3.6-19.97,14.396-19.97,27.121v34.914V373.8h-3.177c-14.685,0-26.632,11.947-26.632,26.632    v10.341c0,14.685,11.947,26.632,26.632,26.632h3.177v15.954c0,0.879,0.027,1.756,0.067,2.634c0.012,0.269,0.026,0.535,0.042,0.802    c0.039,0.667,0.091,1.334,0.153,2c0.033,0.351,0.067,0.7,0.106,1.049c0.071,0.633,0.151,1.265,0.242,1.897    c0.062,0.429,0.132,0.855,0.202,1.281c0.063,0.374,0.13,0.747,0.2,1.12c0.165,0.883,0.351,1.759,0.555,2.628    c0.056,0.24,0.108,0.481,0.166,0.721c0.119,0.482,0.251,0.96,0.382,1.436c0.045,0.164,0.084,0.329,0.132,0.493    c0.016,0.054,0.038,0.104,0.054,0.157C237.03,494.046,259.608,512,286.315,512c32.333,0,58.64-26.306,58.64-58.64V308.351    C344.954,297.138,338.42,287.425,328.962,282.812z M196.27,328.653c0,3.41-2.775,6.184-6.184,6.184s-6.184-2.775-6.184-6.184    v-17.424h12.368V328.653z M227.675,420.55h-3.177v-0.001c-5.39,0-9.775-4.385-9.775-9.775v-10.341c0-5.39,4.385-9.775,9.775-9.775    h3.177V420.55z M264.502,27.428c0-5.83,4.742-10.572,10.572-10.572h26.461c5.83,0,10.572,4.742,10.572,10.572v22.519h-47.604    V27.428z M264.502,66.804h47.604v213.149h-15.375V133.47c0-19.53-13.842-35.884-32.229-39.776V66.804z M264.502,243.948    c0-0.013,0-0.027,0-0.04v-132.7c8.976,3.411,15.374,12.104,15.374,22.262v146.484h-15.374V243.948z M244.543,453.784    c-0.001-0.142-0.011-0.282-0.011-0.424v-24.383v-46.749v-24.847c15.543,10.854,25.065,28.665,25.065,48.222    C269.597,424.983,260.045,442.89,244.543,453.784z M328.098,453.36h-0.001c0,23.039-18.744,41.783-41.783,41.783    c-16.659,0-31.067-9.803-37.772-23.94c23.26-13.424,37.911-38.38,37.911-65.599c0-28.998-16.275-55.011-41.922-67.773v-29.479    c0-6.364,5.176-11.541,11.541-11.541h32.23h28.254c6.363,0,11.54,5.176,11.54,11.541V453.36z" />
                                    </g>
                                </g>
                            </svg>
                        </div>

                        <div className="rounded-full bg-white p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-purple-300"
                                fill="currentColor"
                                version="1.1"
                                id="Layer_1"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <g>
                                        <path d="M375.467,0c-4.719,0-8.533,3.814-8.533,8.533V128h-17.067V8.533c0-4.719-3.814-8.533-8.533-8.533    c-4.719,0-8.533,3.814-8.533,8.533V128h-17.067V8.533c0-4.719-3.814-8.533-8.533-8.533s-8.533,3.814-8.533,8.533V128H281.6V8.533    c0-4.719-3.814-8.533-8.533-8.533s-8.533,3.814-8.533,8.533V128h-17.067V8.533c0-4.719-3.814-8.533-8.533-8.533    S230.4,3.814,230.4,8.533V128h-17.067V8.533c0-4.719-3.814-8.533-8.533-8.533s-8.533,3.814-8.533,8.533V128H179.2V8.533    c0-4.719-3.814-8.533-8.533-8.533s-8.533,3.814-8.533,8.533V128h-17.067V8.533c0-4.719-3.814-8.533-8.533-8.533    S128,3.814,128,8.533V128v8.533c0,55.228,35.251,104.004,87.706,121.378c8.789,2.91,14.694,10.769,14.694,19.567v71.782    l-16.981,118.861l-0.085,1.212C213.333,492.86,232.474,512,256,512c23.526,0,42.667-19.14,42.667-42.667L281.6,349.261v-71.782    c0-8.798,5.905-16.657,14.694-19.567C348.749,240.538,384,191.761,384,136.533V128V8.533C384,3.814,380.186,0,375.467,0z" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="rounded-full bg-white p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-purple-300"
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <rect
                                    width="48"
                                    height="48"
                                    fill="white"
                                    fillOpacity="0.01"
                                />
                                <path
                                    d="M18 31H38V5"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M30 21H10V43"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M44 11L38 5L32 11"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 37L10 43L4 37"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
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
