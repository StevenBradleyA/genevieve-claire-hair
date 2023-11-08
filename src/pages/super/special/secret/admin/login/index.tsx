import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { hash } from "bcryptjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Custom404 from "~/pages/404";
import hacktime from "@public/Gifs/hackerman-gif.gif";
import matrix from "@public/Gifs/matrix.gif";

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
        <div className="absolute top-0 z-10 flex h-full w-full justify-center bg-hackingtime p-20 text-green-500 ">
            <div className=" relative z-0 mt-40 flex w-2/3 flex-col items-center justify-center rounded-2xl bg-black  ">
                <Image src={hacktime} alt="hacking time" className="z-50" />
                <Image
                    src={matrix}
                    alt="hacking time"
                    className="matrix-time absolute left-0 top-0 h-full w-full rounded-2xl opacity-50 "
                />

                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="mb-5 rounded border border-green-500 bg-black px-4 py-2 text-green-500 placeholder-green-500 focus:border-green-700 focus:outline-none"
                    placeholder="It's Hacking Time"
                />
                <button
                    onClick={() => void hackerHash()}
                    className="rounded-2xl bg-green-500 px-6 py-1 text-black  hover:bg-hackingtime hover:text-green-500"
                >
                    {`C:\\\\> Hack`}
                </button>
            </div>
        </div>
    );
}
