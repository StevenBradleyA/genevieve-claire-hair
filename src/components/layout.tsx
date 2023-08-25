import { useSession } from "next-auth/react";
import NavBar from "./NavBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const router = useRouter();
    const isNew = session?.user.isNew;

    useEffect(() => {
        async function redirectIfNotNew() {
            if (!isNew) {
                try {
                    await router.push("/");
                } catch (error) {
                    console.error("Error while redirecting:", error);
                }
            }
        }
        void redirectIfNotNew();
    }, [isNew]);

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
