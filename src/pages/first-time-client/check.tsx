import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function FTCCheck() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // TODO: Prevent extra fetch call to "/"
    useEffect(() => {
        if (!session) return;

        if (status === "authenticated" && session.user.isNew)
            void router.push("/first-time-client");

        if (status === "authenticated" && !session.user.isNew)
            void router.push("/");
    }, [status, session, router]);

    return <div>Checking...</div>;
}
