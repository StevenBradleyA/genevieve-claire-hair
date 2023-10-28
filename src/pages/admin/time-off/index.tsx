import type { NextPageWithLayout } from "~/pages/_app";
import AdminLayout from "../layout";
import type { ReactElement } from "react";
import CreateTimeOff from "~/components/TimeOff/Create";
import DisplayTimeOff from "~/components/TimeOff/Display";
import { useSession } from "next-auth/react";
import Custom404 from "~/pages/404";

const AdminViewTimeOff: NextPageWithLayout = () => {
    const { data: session } = useSession();

    const accessDenied = !session || !session.user.isAdmin;

    if (accessDenied) {
        return <Custom404 />;
    }

    return (
        <>
            <CreateTimeOff />
            <DisplayTimeOff />
        </>
    );
};

AdminViewTimeOff.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminViewTimeOff;
