import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import AdminLayout from "./layout";
import { useSession } from "next-auth/react";

const AdminPage: NextPageWithLayout = () => {
    // TODO add admin only viewing or redirect if user is not admin
    const { data: session } = useSession();

    console.log(session)

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
