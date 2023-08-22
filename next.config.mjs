/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
// import withTmInitializer from "next-transpile-modules";
import nextTranspileModules from "next-transpile-modules";

const withTm = nextTranspileModules([
    "@square/web-sdk",
    "react-square-web-payments-sdk",
]);

/** @type {import("next").NextConfig} */
const config = withTm({
    reactStrictMode: true,
    /**
     * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
     * out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    experimental: {
        esmExternals: "loose",
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    images: {
        domains: [
            "scontent.cdninstagram.com",
            "genevieveclairehair.s3.us-west-2.amazonaws.com",
        ],
        remotePatterns: [
            {
                hostname: "**.cdninstagram.com",
            },
        ],
    },
});

export default config;
