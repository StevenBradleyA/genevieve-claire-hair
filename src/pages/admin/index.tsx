import { useEffect, type ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import AdminLayout from "./layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NotFound from "~/components/NotFound";

const AdminPage: NextPageWithLayout = () => {
    // TODO add admin only viewing or redirect if user is not admin
    const { data: session } = useSession();
    const router = useRouter();

    const accessDenied = !session || !session.user.isAdmin;

    if (accessDenied) {
       return <NotFound />
    }

    return (
        <div className="text-4xl text-white ">
            <div> {session?.user?.notes}</div>
        </div>
    );
};

AdminPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminPage;
