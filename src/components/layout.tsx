import NavBar from "./NavBar";
import localFont from "next/font/local";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

// export const metadata: Metadata = {
//     title: "Genevieve Clare Hair",
//     description:
//         "Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington",
//     applicationName: "Genevieve Clare Hair",
//     generator: "Next.js",
//     keywords: [
//         "hair stylist",
//         "color correction",
//         "Seattle",
//         "Geni",
//         "Genevieve clare hair",
//         "Issaquah Hair",
//     ],
//     referrer: "origin",
//     appleWebApp: {
//         capable: true,
//         title: "Genevieve Clare Hair",
//         statusBarStyle: "black-translucent",
//     },
//     icons: {
//         icon: "/favicon.ico",
//         // apple: "/apple-touch-icon.png",
//     },
//     openGraph: {
//         type: "website",
//         url: "https://genevieveclare.hair",
//         title: "Genevieve Clare Hair",
//         description:
//             "Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington",
//         siteName: "Genevieve Clare Hair",
//         images: [
//             {
//                 url: "https://genevieveclare.hair/og-image.png",
//                 width: 1200,
//                 height: 630,
//                 alt: "Genevieve Clare Hair",
//             },
//         ],
//     },
//     twitter: {
//         card: "summary_large_image",
//         site: "@genevieveclarehair",
//         creator: "@genevieveclarehair",
//         title: "Genevieve Clare Hair",
//         description:
//             "Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington",
//         images: ["https://genevieveclare.hair/og-image.png"],
//     },
//     // verification: {
//     //     google: '1234567890',
//     //     yandex: '1234567890',
//     // },
// };
const raleway = localFont({
    src: "../../public/fonts/Raleway-VariableFont_wght.ttf",
    display: "swap",
    variable: "--font-mooli",
});
export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const router = useRouter();
    const isNew = session?.user.isNew;

    useEffect(() => {
        if (router.asPath === "/super/special/secret/admin/login") return;
        const isCurrentPageFirstTimeClient =
            router.asPath === "/first-time-client";
        if (isNew && !isCurrentPageFirstTimeClient) {
            void router.push("/first-time-client");
        }
    }, [isNew, router.asPath, session]);

    return (
        <>
            <Head>
                <title>Genevieve Clare Hair</title>
                <meta
                    name="description"
                    content="Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington"
                />
                <meta name="application-name" content="Genevieve Clare Hair" />
                <meta name="generator" content="Next.js" />
                <meta
                    name="keywords"
                    content="hair stylist, color correction, Seattle, Geni, Genevieve clare hair, Issaquah Hair"
                />
                <meta name="referrer" content="origin" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Genevieve Clare Hair"
                />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://genevieveclare.hair" />
                <meta property="og:title" content="Genevieve Clare Hair" />
                <meta
                    property="og:description"
                    content="Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington"
                />
                <meta property="og:site_name" content="Genevieve Clare Hair" />
                <meta
                    property="og:image"
                    content="https://genevieveclare.hair/og-image.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@genevieveclarehair" />
                <meta name="twitter:creator" content="@genevieveclarehair" />
                <meta name="twitter:title" content="Genevieve Clare Hair" />
                <meta
                    name="twitter:description"
                    content="Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington"
                />
                <meta
                    name="twitter:image"
                    content="https://genevieveclare.hair/og-image.png"
                />
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
