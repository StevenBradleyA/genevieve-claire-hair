import type { NextPageWithLayout } from "~/pages/_app";
import AdminLayout from "../layout";
import type { ReactElement } from "react";
import CreateTimeOff from "~/components/TimeOff/Create";
import DisplayTimeOff from "~/components/TimeOff/Display";

const AdminViewTimeOff: NextPageWithLayout = () => {
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
