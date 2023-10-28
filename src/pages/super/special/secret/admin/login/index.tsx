import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { hash } from "bcryptjs";
import { useSession } from "next-auth/react";
import Custom404 from "~/pages/404";

export default function SuperSpecialSecretAdminLogin() {
    const [pass, setPass] = useState("");
    const router = useRouter();
    const { data, update, status } = useSession();

    const { mutate } = api.user.grantAdmin.useMutation({
        onSuccess: async (res) => {
            await update();
            if (res === "Success") void router.push("/");
            if (res === "Incorrect") return; //TODO: Cool hacker invalid msg
            if (res === "Error") return; //TODO: Cool hacker error msg
        },
    });

    const hackerHash = async () => {
        const hashPass = await hash(pass, 6);
        console.log("hey");
        mutate(hashPass);
    };

    if (status === "loading") return <></>;

    if (!data && status === "unauthenticated") return <Custom404 />;

    return (
        <>
            <label>secret hacker message</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} />
            <button onClick={() => void hackerHash()}>hack</button>
        </>
    );
}
