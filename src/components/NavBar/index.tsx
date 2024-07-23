import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import giraffe from "@public/Logos/giraffe-black.png";
import homeText from "@public/Logos/home-text.png";
import homeBackground from "@public/Logos/home-background-whitened.png";

import { useState, useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { useMobile } from "../MobileContext";
import { motion } from "framer-motion";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const { data: sessionData } = useSession();
    const { isMobile } = useMobile();
    const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const exitRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                exitRef.current &&
                !exitRef.current.contains(event.target as Node) &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // animation

    const mobileArrowEffects = {
        initial: { x: 0 },
        tap: { x: 8 },
    };
    const mobileTailEffects = {
        initial: { opacity: 0 },
        tap: { opacity: 1 },
    };

    return isMobile ? (
        <nav
            className="overflow-a z-20 mb-10 flex items-center
            justify-between px-5 text-white"
            aria-label="Main Navigation"
        >
            <Link href="/" aria-label="Home">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
                    viewBox="0 0 24 24"
                    version="1.1"
                >
                    <defs>
                        <linearGradient
                            x1="0"
                            y1="0"
                            x2="100%"
                            y2="0"
                            id="gradientText"
                        >
                            <stop offset="0%" stopColor="#c7d2fe" />
                            <stop offset="50%" stopColor="#f5d0fe" />
                            <stop offset="100%" stopColor="#d8b4fe" />
                        </linearGradient>
                    </defs>
                    <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g>
                            <rect
                                id="Rectangle"
                                fillRule="nonzero"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                            ></rect>
                            <path
                                d="M5,10 L5,19 C5,19.5523 5.44772,20 6,20 L18,20 C18.5523,20 19,19.5523 19,19 L19,10"
                                id="Path"
                                stroke="url(#gradientText)"
                                strokeWidth="2"
                                strokeLinecap="round"
                            ></path>
                            <path
                                d="M21,11 L12.307,4.23875 C12.1264,4.09832 11.8736,4.09832 11.693,4.23875 L3,11"
                                id="Path"
                                stroke="url(#gradientText)"
                                strokeWidth="2"
                                strokeLinecap="round"
                            ></path>
                        </g>
                    </g>
                </svg>
            </Link>
            <div className=" flex flex-col">
                <div
                    className={`burger-container ${
                        isMenuOpen ? "is-open" : "is-closed"
                    }`}
                    ref={exitRef}
                    onClick={toggleMenu}
                >
                    <div className="line-top"></div>
                    <div className="line-middle"></div>
                    <div className="line-bottom"></div>
                </div>
                {isMenuOpen && (
                    <div
                        className="absolute right-5 top-20 z-40 flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-5 text-lg shadow-2xl"
                        ref={menuRef}
                    >
                        {sessionData && sessionData.user ? (
                            <div className=" flex justify-center text-xl">
                                Hello {sessionData.user?.name}!
                            </div>
                        ) : null}
                        <Link
                            href="/bookings"
                            aria-label="Bookings"
                            onClick={toggleMenu}
                        >
                            <motion.div
                                whileTap={{ opacity: 0.7 }}
                                className="flex justify-center rounded-2xl bg-white px-6 py-2 shadow-sm "
                            >
                                <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in ">
                                    Book Your Appointment
                                </div>
                            </motion.div>
                        </Link>

                        <Link
                            href="/portfolio"
                            aria-label="Portfolio"
                            onClick={toggleMenu}
                        >
                            <motion.div
                                whileTap={{ opacity: 0.7 }}
                                className="flex justify-center rounded-2xl bg-white px-6 py-2 shadow-sm "
                            >
                                <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in ">
                                    Portfolio
                                </div>
                            </motion.div>
                        </Link>

                        <Link
                            href="/pricing"
                            aria-label="Pricing"
                            onClick={toggleMenu}
                        >
                            <motion.div
                                whileTap={{ opacity: 0.7 }}
                                className="flex justify-center rounded-2xl bg-white px-6 py-2 shadow-sm "
                            >
                                <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in ">
                                    Pricing
                                </div>
                            </motion.div>
                        </Link>

                        <Link
                            href="/reviews"
                            aria-label="Reviews"
                            onClick={toggleMenu}
                        >
                            <motion.div
                                whileTap={{ opacity: 0.7 }}
                                className="flex justify-center rounded-2xl bg-white px-6 py-2 shadow-sm "
                            >
                                <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in ">
                                    Reviews
                                </div>
                            </motion.div>
                        </Link>

                        {sessionData?.user && sessionData.user.isAdmin && (
                            <Link
                                href="/admin"
                                aria-label="Feature"
                                onClick={toggleMenu}
                            >
                                <motion.div
                                    whileTap={{ opacity: 0.7 }}
                                    className="flex justify-center rounded-2xl bg-white px-6 py-2 shadow-sm "
                                >
                                    <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in ">
                                        Admin
                                    </div>
                                </motion.div>
                            </Link>
                        )}
                        <div className=" flex flex-col items-center justify-center gap-1 text-lg text-white">
                            <motion.button
                                aria-label={
                                    sessionData ? "Sign out" : "Sign in"
                                }
                                className=" relative flex items-center rounded-2xl bg-white  py-[6px] pl-4 pr-8 text-purple-300"
                                onClick={
                                    sessionData
                                        ? () => void signOut()
                                        : () => void signIn()
                                }
                                whileTap="tap"
                                initial="initial"
                            >
                                <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ">
                                    {sessionData ? "Sign out" : "Sign in"}
                                </div>
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-3 top-[10px] flex h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    variants={mobileArrowEffects}
                                >
                                    <motion.path
                                        d="M9 6L15 12L9 18"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    <motion.path
                                        d="M16 13H2v-2h13v2z"
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        variants={mobileTailEffects}
                                    />
                                </motion.svg>
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    ) : (
        <div className="sticky -top-5 z-20">
            <nav
                className={` ${
                    isScrolled
                        ? ` bg-darkerGlass text-white`
                        : `mx-5 rounded-xl bg-white/30 text-purple-300 shadow-sm `
                } my-5  flex items-center justify-between px-1 py-6 text-sm laptop:px-10 laptop:text-xl desktop:text-2xl `}
                aria-label="Main Navigation -z-30"
            >
                {sessionData?.user && sessionData.user.isAdmin ? (
                    <Link
                        href="/admin"
                        aria-label="Feature"
                        className="relative rounded-2xl bg-white px-4 py-1 hover:opacity-70"
                    >
                        <Image
                            alt="admin logo"
                            className="image-black-to-purple absolute -right-10 -top-5 h-20 w-20 object-contain"
                            src={giraffe}
                        />
                        <div className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-2xl text-transparent  ease-in ">
                            Admin
                        </div>
                    </Link>
                ) : (
                    <Link
                        href="/"
                        aria-label="Home"
                        className="ease-in hover:opacity-70"
                    >
                        {isScrolled ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-14 w-14"
                                viewBox="0 0 24 24"
                                version="1.1"
                            >
                                <g
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g>
                                        <rect
                                            id="Rectangle"
                                            fillRule="nonzero"
                                            x="0"
                                            y="0"
                                            width="24"
                                            height="24"
                                        ></rect>
                                        <path
                                            d="M5,10 L5,19 C5,19.5523 5.44772,20 6,20 L18,20 C18.5523,20 19,19.5523 19,19 L19,10"
                                            id="Path"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        ></path>
                                        <path
                                            d="M21,11 L12.307,4.23875 C12.1264,4.09832 11.8736,4.09832 11.693,4.23875 L3,11"
                                            id="Path"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-14 w-14"
                                viewBox="0 0 24 24"
                                version="1.1"
                            >
                                <defs>
                                    <linearGradient
                                        x1="0"
                                        y1="0"
                                        x2="100%"
                                        y2="0"
                                        id="gradientText"
                                    >
                                        <stop offset="0%" stopColor="#c7d2fe" />
                                        <stop
                                            offset="50%"
                                            stopColor="#f5d0fe"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#d8b4fe"
                                        />
                                    </linearGradient>
                                </defs>
                                <g
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g>
                                        <rect
                                            id="Rectangle"
                                            fillRule="nonzero"
                                            x="0"
                                            y="0"
                                            width="24"
                                            height="24"
                                        ></rect>
                                        <path
                                            d="M5,10 L5,19 C5,19.5523 5.44772,20 6,20 L18,20 C18.5523,20 19,19.5523 19,19 L19,10"
                                            id="Path"
                                            stroke="url(#gradientText)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        ></path>
                                        <path
                                            d="M21,11 L12.307,4.23875 C12.1264,4.09832 11.8736,4.09832 11.693,4.23875 L3,11"
                                            id="Path"
                                            stroke="url(#gradientText)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        )}
                    </Link>
                )}

                <div className=" flex items-center gap-0 tablet:gap-2 laptop:gap-8 desktop:gap-10 ">
                    <Link
                        href="/bookings"
                        aria-label="Bookings"
                        className={`  ${
                            isScrolled
                                ? "text-white hover:opacity-70"
                                : "bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in  hover:text-purple-300"
                        }`}
                    >
                        Book Your Appointment
                    </Link>

                    <Link
                        href="/portfolio"
                        aria-label="Images"
                        className={`  ${
                            isScrolled
                                ? "text-white hover:opacity-70"
                                : "bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in  hover:text-purple-300"
                        }`}
                    >
                        Portfolio
                    </Link>
                    <Link
                        href="/"
                        aria-label="Home"
                        className="home-button relative -mt-2 "
                    >
                        <Image
                            alt="home button"
                            src={homeBackground}
                            className="h-full w-80 opacity-30 "
                            priority={true}
                        />
                        <Image
                            alt="home button"
                            src={homeText}
                            className={`${
                                isScrolled
                                    ? "image-black-to-white hover:opacity-70"
                                    : "home-button-text"
                            } absolute left-0 top-0 h-full w-80
                            `}
                            priority={true}
                        />
                    </Link>
                    <Link
                        href="/pricing"
                        aria-label="Pricing"
                        className={`  ${
                            isScrolled
                                ? "text-white hover:opacity-70"
                                : "bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in  hover:text-purple-300"
                        }`}
                    >
                        Pricing
                    </Link>

                    <Link
                        href="/reviews"
                        aria-label="Feature"
                        className={`  ${
                            isScrolled
                                ? "text-white hover:opacity-70"
                                : "bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent ease-in  hover:text-purple-300"
                        }`}
                    >
                        Reviews
                    </Link>
                </div>

                <AuthController />
            </nav>
        </div>
    );
}

function AuthController() {
    const { data: sessionData } = useSession();

    const arrowEffects = {
        initial: { x: 0 },
        hover: { x: 8 },
    };
    const tailEffects = {
        initial: { opacity: 0 },
        hover: { opacity: 1 },
    };

    return (
        <div className=" flex flex-col items-center justify-center gap-1 text-lg text-white">
            <motion.button
                aria-label={sessionData ? "Sign out" : "Sign in"}
                className=" relative flex items-center rounded-2xl bg-white  py-[6px] pl-4 pr-8 text-purple-300"
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                }
                whileHover="hover"
                initial="initial"
            >
                {sessionData ? "Sign out" : "Sign in"}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-[10px] flex h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    variants={arrowEffects}
                >
                    <motion.path
                        d="M9 6L15 12L9 18"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <motion.path
                        d="M16 13H2v-2h13v2z"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={tailEffects}
                    />
                </motion.svg>
            </motion.button>
            <p className="text-white ">
                {sessionData && <span>Hello {sessionData.user?.name}!</span>}
            </p>
        </div>
    );
}
