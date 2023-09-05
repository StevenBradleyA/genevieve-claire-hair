import type { ReactElement } from "react";
import type { NextPageWithLayout } from "~/pages/_app";
import AdminLayout from "../layout";

const AdminViewServices: NextPageWithLayout = () => {
    return <div>Hey</div>;
};

AdminViewServices.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminViewServices;
