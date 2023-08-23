import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import homeLogo from "../../../public/home-logo.png";
import holoColumn from "../../../public/Holographic/holo-column.png";
import geniSignature from "../../../public/signature.png";
import { useState } from "react";
import { useMobile } from "../MobileContext";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const { isMobile } = useMobile();

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

    return isMobile ? (
        <nav
            className="z-20 mb-10 flex items-center justify-between
            bg-glass px-5 text-white"
            aria-label="Main Navigation"
        >
            <Link href="/" aria-label="Home">
                <Image alt="home" src={homeLogo} className=" mb-2 w-32" />
            </Link>
            <div className="mr-10 flex flex-col">
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
                    <div className="absolute left-28 top-20 z-40 flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-blue-200 p-5 text-lg shadow-2xl">
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
        </nav>
    ) : (
        <div className="p-5">
            <nav
                className="sticky top-0 z-10 mb-5 flex items-center justify-between
            rounded-2xl bg-glass py-2 text-white shadow-sm"
                aria-label="Main Navigation"
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
                    <div className=" flex w-80 justify-center">
                        <Link href="/" aria-label="Home">
                            <div className="diagonal-image-container">
                                <Image
                                    src={geniSignature}
                                    alt="art"
                                    width={geniSignature.width}
                                    height={geniSignature.height}
                                    className=" object-cover"
                                />
                                <div className="holo-column-container">
                                    <Image
                                        alt="holo column graphic"
                                        src={holoColumn}
                                        className="h-80 w-6 object-cover"
                                        priority={true}
                                    />
                                </div>
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
                <div className="group relative font-grand-hotel text-5xl text-violet-300">
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
                className="font-grand-hotel text-5xl "
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                    // undefined, {callbackUrl: "/first-time-client/check",}
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
