import { useRouter } from "next/router";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ReactElement } from "react";
import AdminLayout from "../layout";
import ClientDetails from "~/components/Clients/clientDetails";
import { useSession } from "next-auth/react";
import Custom404 from "~/pages/404";
import Footer from "~/components/Footer/footer";

const ClientProfile: NextPageWithLayout = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: session } = useSession();

    const accessDenied = !session || !session.user.isAdmin;

    if (accessDenied) {
        return <Custom404 />;
    }

    return (
        <div className="flex w-3/4 flex-col">
            {userId && <ClientDetails userId={userId as string} />}
        </div>
    );
};

ClientProfile.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <AdminLayout>{page}</AdminLayout>;
            <div className="mt-60 w-full">
                <Footer />
            </div>
        </>
    );
};

export default ClientProfile;
