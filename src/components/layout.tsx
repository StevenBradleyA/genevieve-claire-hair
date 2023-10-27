import { useSession } from "next-auth/react";
import NavBar from "./NavBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import localFont from "next/font/local";
// import { signIn } from "next-auth/react";
// import toast from "react-hot-toast";

const raleway = localFont({
    src: "../../public/fonts/Raleway-VariableFont_wght.ttf",
    display: "swap",
    variable: "--font-mooli",
});

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const router = useRouter();
    const isNew = session?.user.isNew;
    // const isCurrentPageBookings = router.asPath === "/bookings";

    // TODO: Check back here once account linking is implemented!

    useEffect(() => {
        if (router.asPath === "/super/special/secret/admin/login") return;
        const isCurrentPageFirstTimeClient =
            router.asPath === "/first-time-client";
        if (isNew && !isCurrentPageFirstTimeClient) {
            void router.push("/first-time-client");
        }

        // if (isCurrentPageBookings && session === null) {
        //     toast.success("Sign in to book an appointment!", {
        //         icon: "😱",
        //         style: {
        //             borderRadius: "10px",
        //             background: "#333",
        //             color: "#fff",
        //         },
        //     });

        //     void signIn();
        // }
    }, [isNew, router.asPath, session]);

    return (
        <>
            <Head>
                <title>Genevieve Clare Hair</title>
                <meta
                    name="description"
                    content="Genevieve Clare Hair. You're pretty when you get here, prettier when you leave."
                />
                <link rel="icon" href="/favicon-heart.ico" />
            </Head>

            <div
                className={`flex min-h-screen flex-col bg-gradient-to-br from-fuchsia-100 to-blue-200  mobile:overflow-auto sm:overflow-visible ${raleway.className} `}
            >
                <NavBar />
                <main className="flex flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
}
