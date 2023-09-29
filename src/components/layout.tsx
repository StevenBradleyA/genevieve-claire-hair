import { useSession } from "next-auth/react";
import NavBar from "./NavBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { signIn } from "next-auth/react";
// import toast from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const router = useRouter();
    const isNew = session?.user.isNew;
    // const isCurrentPageBookings = router.asPath === "/bookings";

    useEffect(() => {
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
                    content="The one clone to rule them all"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-screen flex-col bg-gradient-to-br from-fuchsia-100 to-blue-200  mobile:overflow-auto sm:overflow-visible ">
                <NavBar />
                <main className="flex flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
}
