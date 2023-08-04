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
        <div className="flex flex-col justify-center gap-5">
            <Image
                src={firstTime.src}
                width={firstTime.width}
                height={firstTime.height}
                alt="First time?"
            />

            <FormController />
        </div>
    );
}
