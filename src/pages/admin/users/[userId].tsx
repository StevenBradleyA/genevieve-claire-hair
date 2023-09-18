import { useRouter } from "next/router";
import ClientDetails from "~/components/Clients/ClientDetails";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ReactElement } from "react";
import AdminLayout from "../layout";
import ClientBookings from "~/components/Clients/ClientBookings";

const ClientProfile: NextPageWithLayout = () => {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <div>
            <div>{userId && <ClientDetails userId={userId as string} />}</div>
            <div>{userId && <ClientBookings userId={userId as string} />}</div>
        </div>
    );
};

ClientProfile.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default ClientProfile;
