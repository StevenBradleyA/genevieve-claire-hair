import { useRouter } from "next/router";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ReactElement } from "react";
import AdminLayout from "../layout";
import ClientDetails from "~/components/Clients/clientDetails";

const ClientProfile: NextPageWithLayout = () => {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <div className="flex w-3/4 flex-col">
            {userId && <ClientDetails userId={userId as string} />}
        </div>
    );
};

ClientProfile.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default ClientProfile;
