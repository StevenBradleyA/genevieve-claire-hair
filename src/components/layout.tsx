import NavBar from "./NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
            <NavBar />
            <main className="flex flex-col items-center justify-center">
                {children}
            </main>
        </>
    );
}
