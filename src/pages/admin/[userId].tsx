import { useRouter } from "next/router";
import ClientDetails from "~/components/Clients/clientDetails";

export default function ClientProfile() {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <div className="flex">
            <h1> client details</h1>
            {userId && <ClientDetails userId={userId.toString()} />}
        </div>
    );
}
