import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "../components/layout";
import MobileProvider from "~/components/MobileContext";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <MobileProvider>

            <Layout>
                <Component {...pageProps} />
            </Layout>
            </MobileProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
