import Image from "next/image";
import firstTime from "@public/first-time.png";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import FormController from "~/components/FormController";

export default function FirstTimeClient() {
    const router = useRouter();
    const { mutate } = api.user.updateNewUser.useMutation({
        onSuccess: () => router.push("/"),
    });

    return (
        <div className="flex flex-col justify-center gap-5 items-center">
           <h1 className="text-white font-grand-hotel text-8xl"> First Time Client</h1>

            <FormController name="NewClient" />
        </div>
    );
}
