import NavBar from "./NavBar";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Genevieve Claire Hair</title>
                <meta
                    name="description"
                    content="The one clone to rule them all"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen bg-rose-100">
                <NavBar />
                <div className="absolute top-0 left-0 h-full w-4/12 bg-rose-200 opacity-75"></div>
                <main className="relative flex  flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
}
