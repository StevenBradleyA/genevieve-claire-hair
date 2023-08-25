import { useRouter } from "next/router";
import ClientDetails from "~/components/Clients/clientDetails";

export default function ClientProfile() {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            {/* <div className="text-8xl font-grand-hotel text-white"> client details</div> */}
            {userId && <ClientDetails userId={userId.toString()} />}
        </div>
    );
}
