import NavBar from "./NavBar";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
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
            <div className="min-h-screen bg-peach">
                <NavBar />
                <main className="flex  flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
}
