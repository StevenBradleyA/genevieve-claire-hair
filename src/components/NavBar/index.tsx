import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import homeLogo from "../../../public/home-logo.png";
import holoColumn from "../../../public/Holographic/holo-column.png";

export default function NavBar() {
    return (
        <nav
            className="sticky top-0 z-10 mb-10 flex items-center justify-between 
            rounded-b-3xl py-2 text-white"
            aria-label="Main Navigation"
        >
            <Link href="/" aria-label="Home">
                <Image alt="home" src={homeLogo} className=" mb-2 w-48" />
            </Link>

            <ul className="flex flex-grow items-center justify-around text-2xl">
                <li>
                    <Link href="/bookings" aria-label="Bookings">
                        <div className="diagonal-image-container hidden md:block">
                            <Image
                                alt="holo column graphic"
                                src={holoColumn}
                                className="diagonal-image h-72 w-10 object-cover"
                            />
                            <span className="relative z-10">
                                Book Your Appointment
                            </span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/portfolio" aria-label="Images">
                    <div className="diagonal-image-container hidden md:block">
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
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
            </ul>
            <AuthController />
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
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}
