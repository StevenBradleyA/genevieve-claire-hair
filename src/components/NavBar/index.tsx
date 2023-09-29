import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import homeLogo from "../../../public/home-logo.png";
import holoColumn from "../../../public/Holographic/holo-column.png";
import geniSignature from "../../../public/signature.png";
import { useState, useEffect } from "react";
import { useMobile } from "../MobileContext";
export default function NavBar() {
    // TODO make admin  admin only
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const { data: sessionData } = useSession();
    const { isMobile } = useMobile();
    const isNew = sessionData?.user.isNew;

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

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isMobile ? (
        <nav
            className="z-20 mb-10 flex items-center justify-between
            overflow-auto bg-glass px-5 text-white"
            aria-label="Main Navigation"
        >
            <Link href="/" aria-label="Home">
                <Image alt="home" src={homeLogo} className=" mb-2 w-32" />
            </Link>
            <div className="mr-10 flex flex-col">
                <div
                    className={`burger-container ${
                        isMenuOpen ? "is-open" : "is-closed"
                    }`}
                    onClick={toggleMenu}
                >
                    <div className="line-top"></div>
                    <div className="line-middle"></div>
                    <div className="line-bottom"></div>
                </div>
                {isMenuOpen && (
                    <div className="absolute right-5 top-20 z-40 flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-5 text-lg shadow-2xl">
                        {sessionData && sessionData.user ? (
                            <div className=" flex justify-center text-xl">
                                Hello {sessionData.user?.name}!
                            </div>
                        ) : null}
                        <Link
                            href="/bookings"
                            aria-label="Bookings"
                            className="flex justify-center rounded-2xl bg-glass px-6 py-2 shadow-sm"
                            onClick={toggleMenu}
                        >
                            Book Your Appointment
                        </Link>

                        <Link
                            href="/portfolio"
                            aria-label="Images"
                            className="flex justify-center rounded-2xl bg-glass px-6 py-2 shadow-sm"
                            onClick={toggleMenu}
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/pricing"
                            aria-label="Pricing"
                            className="flex justify-center rounded-2xl bg-glass px-6 py-2 shadow-sm"
                            onClick={toggleMenu}
                        >
                            Pricing
                        </Link>

                        <Link
                            href="/reviews"
                            aria-label="Feature"
                            className="flex justify-center rounded-2xl bg-glass px-6 py-2 shadow-sm"
                            onClick={toggleMenu}
                        >
                            Reviews
                        </Link>

                        <Link
                            href="/admin"
                            aria-label="Feature"
                            className="flex justify-center rounded-2xl bg-glass px-6 py-2 shadow-sm"
                            onClick={toggleMenu}
                        >
                            Admin
                        </Link>
                        <div className="flex items-center justify-center rounded-2xl bg-glass px-6 py-2 shadow-sm">
                            <button
                                aria-label={
                                    sessionData ? "Sign out" : "Sign in"
                                }
                                className="flex items-center justify-center"
                                onClick={
                                    sessionData
                                        ? () => void signOut()
                                        : () => void signIn()
                                }
                            >
                                {sessionData ? "Sign out" : "Sign in"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    ) : (
        <div className="sticky -top-5 z-20 p-5">
            <nav
                className={` ${
                    isScrolled ? `bg-darkGlass` : `bg-glass`
                } rounded-2xlbg-glass mb-5 flex items-center justify-between py-2 text-white shadow-sm`}
                aria-label="Main Navigation -z-30"
            >
                <Link href="/" aria-label="Home">
                    <Image alt="home" src={homeLogo} className="mb-2 w-32" />
                </Link>

                <div className="mr-16 flex items-center gap-10 text-2xl">
                    <div className="group relative">
                        <Link href="/bookings" aria-label="Bookings">
                            Book Your Appointment
                        </Link>
                        <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </div>
                    <div className="group relative">
                        <Link href="/portfolio" aria-label="Images">
                            Portfolio
                        </Link>
                        <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </div>
                    <div className=" flex justify-center sm:w-40 md:w-60 full:w-80">
                        <Link href="/" aria-label="Home">
                            <div className="diagonal-image-container">
                                <div className="holo-column-container -z-10">
                                    <Image
                                        alt="holo column graphic"
                                        src={holoColumn}
                                        className=" object-cover sm:h-40 sm:w-4 md:h-60 md:w-5 full:h-80 full:w-6"
                                        priority={true}
                                    />
                                </div>
                                <Image
                                    src={geniSignature}
                                    alt="art"
                                    width={geniSignature.width}
                                    height={geniSignature.height}
                                    className=" z-30 object-cover"
                                    priority={true}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="group relative ">
                        <Link href="/pricing" aria-label="Pricing">
                            Pricing
                        </Link>
                        <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </div>

                    <div className="group relative ">
                        <Link href="/reviews" aria-label="Feature">
                            Reviews
                        </Link>
                        <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </div>
                </div>
                <div className="group relative text-3xl text-violet-300">
                    <Link href="/admin" aria-label="Feature">
                        Admin
                    </Link>
                    <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-violet-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                </div>
                <AuthController />
            </nav>
        </div>
    );
}

function AuthController() {
    const { data: sessionData } = useSession();

    return (
        <div className=" mr-10 flex flex-col items-center justify-center gap-1 text-white ">
            <button
                aria-label={sessionData ? "Sign out" : "Sign in"}
                className=" mobile:mb-5 mobile:text-3xl sm:mb-0 sm:text-3xl "
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
            <p className=" opacity-70">
                {sessionData && <span>Hello {sessionData.user?.name}!</span>}
            </p>
        </div>
    );
}
