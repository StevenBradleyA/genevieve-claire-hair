import { useRouter } from "next/router";
import ClientDetails from "~/components/Clients/clientDetails";

export default function ClientProfile() {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            {userId && <ClientDetails userId={userId.toString()} />}
        </div>
    );
}
