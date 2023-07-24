import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import homeLogo from "../../../public/home-logo.png";

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
                        Book Your Appointment
                    </Link>
                </li>
                <li>
                    <Link href="/portfolio" aria-label="Images">
                        Portfolio
                    </Link>
                </li>
                <li>
                    <Link href="/pricing" aria-label="Pricing">
                        Pricing
                    </Link>
                </li>
                <li>
                    <Link href="/reviews" aria-label="Feature">
                        Reviews
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
                    sessionData
                        ? () => void signOut()
                        : () =>
                              void signIn(undefined, {
                                  callbackUrl: "/first-time-client",
                              })
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}
