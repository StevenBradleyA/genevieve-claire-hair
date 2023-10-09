import type { Session } from "next-auth";
import type { AppType } from "next/app";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "../components/layout";
import MobileProvider from "~/components/MobileContext";
import { Toaster } from "react-hot-toast";
import "react-day-picker/dist/style.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type SessionType = {
    session: Session | null;
};

type AppPropsWithLayout = AppProps<SessionType> & {
    Component: NextPageWithLayout;
};

const MyApp: AppType<SessionType> = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <SessionProvider session={session}>
            <div>
                <Toaster />
                <MobileProvider>
                    <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
                </MobileProvider>
            </div>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
