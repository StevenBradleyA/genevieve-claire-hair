import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head title="Genevieve Clare Hair">
                    <meta
                        name="description"
                        content="Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington"
                    />
                    <meta
                        name="application-name"
                        content="Genevieve Clare Hair"
                    />
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
                    <link rel="apple-touch-icon" href="/apple-icon.png" />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://genevieveclare.hair"
                    />
                    <meta property="og:title" content="Genevieve Clare Hair" />
                    <meta
                        property="og:description"
                        content="Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington"
                    />
                    <meta
                        property="og:site_name"
                        content="Genevieve Clare Hair"
                    />
                    <meta
                        property="og:image"
                        content="https://genevieveclare.hair/og-image.png"
                    />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@genevieveclarehair" />
                    <meta
                        name="twitter:creator"
                        content="@genevieveclarehair"
                    />
                    <meta name="twitter:title" content="Genevieve Clare Hair" />
                    <meta
                        name="twitter:description"
                        content="Geni is a hair stylist specializing in color and low maintenance hair based in Issaquah Washington"
                    />
                    <meta
                        name="twitter:image"
                        content="https://genevieveclare.hair/og-image.png"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    ></meta>
                </Head>
                <body className="font-raleway">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
// mobile:overflow-auto sm:overflow-visible
export default MyDocument;
