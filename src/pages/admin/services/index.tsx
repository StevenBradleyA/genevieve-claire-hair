import AdminLayout from "../layout";
import { api } from "~/utils/api";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ServiceSubcategory } from "@prisma/client";

const AdminViewServices: NextPageWithLayout = () => {
    const { data } = api.service.getAll.useQuery();


    return (
        <div>
            {data &&
                data.map((el) => {
                    return (
                        <div key={el.id}>
                            <div>{el.name}</div>
                            {el.subcategories.length && (
                                <SubcategoryView subsArr={el.subcategories} />
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

const SubcategoryView = ({ subsArr }: { subsArr: ServiceSubcategory[] }) => {
    return (
        <ul>
            {subsArr.map((el) => {
                return (
                    <li key={el.id}>
                        {el.name}
                        <div>${el.price}</div>
                        <div>{el.time} minutes</div>
                        <div>{el.bundleTime} minutes</div>
                        <div>
                            Require consult: {el.requireConsult ? "yes" : "no"}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

AdminViewServices.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminViewServices;
