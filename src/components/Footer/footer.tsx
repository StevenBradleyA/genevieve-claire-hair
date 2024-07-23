import Image from "next/image";
import Link from "next/link";
import giraffe from "@public/Logos/giraffe.png";
import heart from "@public/Logos/heart-logo.png";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "../MobileContext";

export default function Footer() {
    const [giraffeIndex, setGiraffeIndex] = useState<number>(0);
    const { isMobile } = useMobile();

    console.log(giraffeIndex);
    return isMobile ? (
        <div className="flex w-full flex-col  bg-darkGlass p-5 text-sm text-white">
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start gap-1">
                    <h2 className=" text-xl text-purple-300">Explore</h2>
                    <Link
                        href="/bookings"
                        aria-label="Book an appointment with Geni"
                        className="hover:opacity-70"
                    >
                        Book Your Appointment
                    </Link>
                    <Link
                        href="/terms-of-service"
                        aria-label="See Geni's work"
                        className="hover:opacity-70"
                    >
                        Portfolio
                    </Link>
                    <Link
                        href="/pricing"
                        aria-label="See the cost of Geni's services"
                        className="hover:opacity-70"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/reviews"
                        aria-label="Read Geni's reviews"
                        className="hover:opacity-70"
                    >
                        Reviews
                    </Link>
                </div>

                <div className="relative  flex w-52 flex-col items-center ">
                    <Image
                        alt="giraffe logo"
                        src={giraffe}
                        className="giraffe-move relative z-30 mb-2 w-20 cursor-pointer object-contain"
                        onClick={() => {
                            setGiraffeIndex((prev) => (prev + 1) % 6);
                        }}
                    />
                    <svg
                        version="1.1"
                        className=" giraffe-shadow text-black/20"
                        xmlns="http://www.w3.org/2000/svg"
                        x="61px"
                        y="20px"
                        width="122px"
                        height="39px"
                        viewBox="0 0 122.436 39.744"
                        fill="none"
                    >
                        <ellipse
                            fill="currentColor"
                            cx="61.128"
                            cy="19.872"
                            rx="49.25"
                            ry="8.916"
                        />
                    </svg>
                    <AnimatePresence>
                        {giraffeIndex >= 1 && (
                            <Link
                                className="absolute right-0 top-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={0}
                                href={"/bookings"}
                                aria-label="book an appointment"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex >= 2 && (
                            <Link
                                className="absolute bottom-0 left-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={1}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex >= 3 && (
                            <Link
                                className="absolute bottom-0 right-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={2}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex >= 4 && (
                            <Link
                                className="absolute left-0 top-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={3}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex === 5 && (
                            <Link
                                className="absolute bottom-16 left-0 flex  w-full justify-center font-dancing-script text-base text-purple-300 hover:opacity-70"
                                key={4}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                BOOK AN APPOINTMENT
                            </Link>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-3 flex flex-col items-start gap-2 border-t-2 pt-3 ">
                <Image
                    alt="logo"
                    src={heart}
                    className="image-black-to-purple h-12 w-12 object-contain"
                />
                <p className="w-full">
                    genevieveclare.hair is my site where clients can book and
                    see my work
                </p>

                <a
                    href="https://www.instagram.com/genevieveclare.hair/"
                    target="_blank"
                    aria-label="Visit Genevieve Clare Hair on Instagram"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 hover:text-purple-300"
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
            </div>
            <div className="mt-3 flex flex-col border-t-2 pt-3">
                <div className="flex w-full justify-end gap-2">
                    <Link
                        href="/terms-of-service"
                        aria-label="Terms of Service"
                        className="hover:opacity-70"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/privacy-policy"
                        aria-label="Privacy Policy"
                        className="hover:opacity-70"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/terms-of-service"
                        aria-label="Terms of Service"
                        className="hover:opacity-70"
                    >
                        Cookies
                    </Link>
                </div>
                <div className="mt-1 text-xs">Powered by Hacktime</div>
            </div>
        </div>
    ) : (
        <div className="flex w-full flex-col  bg-darkGlass px-10 pb-5 pt-10 text-white">
            <div className="flex w-full justify-between">
                <div className="flex flex-col gap-2 ">
                    <Link href={"/"} aria-label="vist the home page">
                        <Image
                            alt="logo"
                            src={heart}
                            className="image-black-to-purple h-12 w-12 object-contain"
                        />
                    </Link>
                    <p className="w-80">
                        genevieveclare.hair is my site where clients can book
                        and see my work
                    </p>

                    <a
                        href="https://www.instagram.com/genevieveclare.hair/"
                        target="_blank"
                        aria-label="Visit Genevieve Clare Hair on Instagram"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 hover:text-purple-300"
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
                </div>

                <div className="relative -mt-5 flex w-96 flex-col items-center ">
                    <Image
                        alt="giraffe logo"
                        src={giraffe}
                        className="giraffe-move relative z-30 mb-2 w-20 cursor-pointer object-contain"
                        onClick={() => {
                            setGiraffeIndex((prev) => (prev + 1) % 6);
                        }}
                    />
                    <svg
                        version="1.1"
                        className=" giraffe-shadow text-black/20"
                        xmlns="http://www.w3.org/2000/svg"
                        x="61px"
                        y="20px"
                        width="122px"
                        height="39px"
                        viewBox="0 0 122.436 39.744"
                        fill="none"
                    >
                        <ellipse
                            fill="currentColor"
                            cx="61.128"
                            cy="19.872"
                            rx="49.25"
                            ry="8.916"
                        />
                    </svg>
                    <AnimatePresence>
                        {giraffeIndex >= 1 && (
                            <Link
                                className="absolute right-0 top-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={0}
                                href={"/bookings"}
                                aria-label="book an appointment"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex >= 2 && (
                            <Link
                                className="absolute bottom-0 left-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={1}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex >= 3 && (
                            <Link
                                className="absolute bottom-0 right-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={2}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex >= 4 && (
                            <Link
                                className="absolute left-0 top-0 rounded-full bg-purple-300 p-1 text-white shadow-md ease-in hover:opacity-70"
                                key={3}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        )}
                        {giraffeIndex === 5 && (
                            <Link
                                className="absolute bottom-16 left-0 flex  w-full justify-center font-dancing-script text-3xl text-purple-300 hover:opacity-70"
                                key={4}
                                aria-label="book an appointment"
                                href={"/bookings"}
                            >
                                BOOK AN APPOINTMENT
                            </Link>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col items-start gap-1">
                    <h2 className=" text-xl text-purple-300">Explore</h2>
                    <Link
                        href="/bookings"
                        aria-label="Book an appointment with Geni"
                        className="hover:opacity-70"
                    >
                        Book Your Appointment
                    </Link>
                    <Link
                        href="/terms-of-service"
                        aria-label="See Geni's work"
                        className="hover:opacity-70"
                    >
                        Portfolio
                    </Link>
                    <Link
                        href="/pricing"
                        aria-label="See the cost of Geni's services"
                        className="hover:opacity-70"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/reviews"
                        aria-label="Read Geni's reviews"
                        className="hover:opacity-70"
                    >
                        Reviews
                    </Link>
                </div>
            </div>
            <div className="flex flex-col"></div>
            <div className="mt-5 flex justify-between border-t-2 pt-5">
                <div className="">
                    Inspired by the capes Geni uses in her salon | Powered by
                    Hacktime
                </div>
                <div className="flex gap-5">
                    <Link
                        href="/terms-of-service"
                        aria-label="Terms of Service"
                        className="hover:opacity-70"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/privacy-policy"
                        aria-label="Privacy Policy"
                        className="hover:opacity-70"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/terms-of-service"
                        aria-label="Terms of Service"
                        className="hover:opacity-70"
                    >
                        Cookies
                    </Link>
                </div>
            </div>
        </div>
    );
}
