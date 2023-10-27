import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { hash } from "bcryptjs";
import { useSession } from "next-auth/react";

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

    if (!data && status === "unauthenticated")
        return (
            <div className="m-40 leading-10 text-white">
                <h1 className="mr-5 inline-block border-r border-gray-300 pr-6 align-top text-2xl font-medium">
                    404
                </h1>
                <div className="inline-block">
                    <h2 className="text-base font-light leading-7">
                        This page could not be found.
                    </h2>
                </div>
            </div>
        );

    return (
        <>
            <label>secret hacker message</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} />
            <button onClick={() => void hackerHash()}>hack</button>
        </>
    );
}
