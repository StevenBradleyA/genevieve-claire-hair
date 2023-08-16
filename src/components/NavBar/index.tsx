import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import homeLogo from "../../../public/home-logo.png";
import holoColumn from "../../../public/Holographic/holo-column.png";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
export default function NavBar() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prevOpen) => !prevOpen);
    };

    // const { data: session, status } = useSession();
    // const router = useRouter();

    // // TODO: Prevent extra fetch call to "/"
    // useEffect(() => {
    //     if (!session) return;

    //     if (status === "authenticated" && session.user.isNew)
    //         void router.push("/first-time-client");

    //     if (status === "authenticated" && !session.user.isNew)
    //         void router.push("/");
    // }, [status, session, router]);

    // TODO make admin  admin only

    return (
        <nav
            className="sticky top-0 z-10 mb-10 flex items-center rounded-b-3xl text-white
            mobile:justify-around mobile:bg-glass mobile:py-0 sm:justify-between sm:bg-clear sm:py-2"
            aria-label="Main Navigation"
        >
            <Link href="/" aria-label="Home">
                <Image
                    alt="home"
                    src={homeLogo}
                    className=" mb-2 w-48 mobile:mb-2 mobile:w-32"
                />
            </Link>
            {isMobile ? (
                <div className="flex flex-col">
                    <div
                        className={`container ${
                            isMenuOpen ? "is-open" : "is-closed"
                        }`}
                        onClick={toggleMenu}
                    >
                        <div className="line-top"></div>
                        <div className="line-middle"></div>
                        <div className="line-bottom"></div>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute left-32 top-20 z-40 flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-5 text-lg shadow-2xl">
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
                            {/* <AuthController /> */}
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <ul className="flex flex-grow items-center justify-around text-2xl">
                        <li className="group relative mr-4">
                            <Link href="/bookings" aria-label="Bookings">
                                <div className="diagonal-image-container">
                                    <Image
                                        alt="holo column graphic"
                                        src={holoColumn}
                                        className="diagonal-image h-64 w-10 object-cover"
                                    />
                                    <span className="relative z-10">
                                        Book Your Appointment
                                    </span>
                                </div>
                            </Link>
                            <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="group relative mr-4">
                            <Link href="/portfolio" aria-label="Images">
                                <div className="diagonal-image-container">
                                    <Image
                                        alt="holo column graphic"
                                        src={holoColumn}
                                        className="diagonal-image-small h-28 w-10 object-cover"
                                    />
                                    <span className="relative z-10">
                                        Portfolio
                                    </span>
                                </div>
                            </Link>
                            <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="group relative mr-4">
                            <Link href="/pricing" aria-label="Pricing">
                                <div className="diagonal-image-container ">
                                    <Image
                                        alt="holo column graphic"
                                        src={holoColumn}
                                        className="diagonal-image-small h-28 w-10 object-cover"
                                    />
                                    <span className="relative z-10">
                                        Pricing
                                    </span>
                                </div>
                            </Link>
                            <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="group relative mr-4">
                            <Link href="/reviews" aria-label="Feature">
                                <div className="diagonal-image-container">
                                    <Image
                                        alt="holo column graphic"
                                        src={holoColumn}
                                        className="diagonal-image-small h-28 w-10 object-cover"
                                    />
                                    <span className="relative z-10">
                                        Reviews
                                    </span>
                                </div>
                            </Link>
                            <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="group relative mr-4">
                            <Link href="/admin" aria-label="Feature">
                                <div className="diagonal-image-container">
                                    <Image
                                        alt="holo column graphic"
                                        src={holoColumn}
                                        className="diagonal-image-small h-28 w-10 object-cover"
                                    />
                                    <span className="relative z-10">Admin</span>
                                </div>
                            </Link>
                            <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-pink-200 transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                    </ul>
                    <AuthController />
                </>
            )}
        </nav>
    );
}

function AuthController() {
    const { data: sessionData } = useSession();

    return (
        <div className="flex flex-col items-center justify-center gap-1 rounded-md border-l-2 px-10 py-2 text-base">
            <p className="text-center">
                {sessionData && <span>Hello {sessionData.user?.name}!</span>}
            </p>
            <button
                aria-label={sessionData ? "Sign out" : "Sign in"}
                className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                    // undefined, {callbackUrl: "/first-time-client/check",}
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}
