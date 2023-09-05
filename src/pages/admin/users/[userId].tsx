import { useRouter } from "next/router";
import ClientDetails from "~/components/Clients/clientDetails";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ReactElement } from "react";
import AdminLayout from "../layout";

const ClientProfile: NextPageWithLayout = () => {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            {userId && <ClientDetails userId={userId.toString()} />}
        </div>
    );
};

ClientProfile.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default ClientProfile;
