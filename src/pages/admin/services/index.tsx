import AdminLayout from "../layout";
import { api } from "~/utils/api";
import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ServiceSubcategory } from "@prisma/client";
import ModalDialog from "~/components/Modal";
import UpdateService from "~/components/Services/Update";
import type { ServicesType } from "~/server/api/routers/service";

const AdminViewServices: NextPageWithLayout = () => {
    const { data } = api.service.getAll.useQuery();

    return (
        <div className="flex w-2/3 flex-col gap-10 rounded-2xl bg-glass p-10 ">
            {data &&
                data.map((el) => {
                    return (
                        <div
                            className=" flex flex-col rounded-2xl bg-darkGlass p-5 text-white shadow-2xl"
                            key={el.id}
                        >
                            <div className="text-5xl font-bold">{el.name}</div>
                            {el.subcategories.length && (
                                <ul>
                                    {el.subcategories.map((sub, i) => (
                                        <SubcategoryView
                                            key={i}
                                            subCat={sub}
                                            serviceData={data}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

const SubcategoryView = ({
    subCat,
    serviceData,
}: {
    subCat: ServiceSubcategory;
    serviceData: ServicesType[];
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <li
                key={subCat.id}
                className="mb-5 flex items-center justify-between rounded-2xl bg-darkGlass px-5"
            >
                {subCat.name}
                <div>${subCat.price}</div>
                <div>{subCat.time} minutes</div>
                <div>{subCat.bundleTime} minutes</div>
                <div>
                    Require consult: {subCat.requireConsult ? "yes" : "no"}
                </div>
                <button
                    onClick={openModal}
                    className="rounded-full bg-glass p-2 px-3 text-3xl shadow-sm"
                >
                    💅
                </button>
            </li>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <UpdateService subService={subCat} serviceData={serviceData} />
            </ModalDialog>
        </>
    );
};

AdminViewServices.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminViewServices;
