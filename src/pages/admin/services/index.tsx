import AdminLayout from "../layout";
import { api } from "~/utils/api";
import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ServiceSubcategory } from "@prisma/client";
import ModalDialog from "~/components/Modal";
import UpdateSubService from "~/components/Services/UpdateSubService";
import type { ServicesType } from "~/server/api/routers/service";
import UpdateMainService from "~/components/Services/UpdateMainService";
import { useSession } from "next-auth/react";
import Custom404 from "~/pages/404";
import Footer from "~/components/Footer/footer";

const AdminViewServices: NextPageWithLayout = () => {
    const { data } = api.service.getAll.useQuery();

    const { data: session } = useSession();

    const accessDenied = !session || !session.user.isAdmin;

    if (accessDenied) {
        return <Custom404 />;
    }

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
                            {el.subcategories.length ? (
                                <ul>
                                    {el.subcategories.map((sub, i) => (
                                        <SubcategoryView key={i} subCat={sub} />
                                    ))}
                                </ul>
                            ) : (
                                <WithoutSubCatView key={el.name} mainCat={el} />
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

const WithoutSubCatView = ({ mainCat }: { mainCat: ServicesType }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <li className="mb-5 flex items-center justify-between rounded-2xl bg-darkGlass px-5">
                {mainCat.name}
                <div>${mainCat.price}</div>
                <div>
                    Require consult: {mainCat.requireConsult ? "yes" : "no"}
                </div>
                <button
                    onClick={openModal}
                    className="rounded-full bg-glass p-2 px-3 text-3xl shadow-sm"
                >
                    💅
                </button>
            </li>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <UpdateMainService
                    mainService={mainCat}
                    closeModal={closeModal}
                />
            </ModalDialog>
        </>
    );
};

const SubcategoryView = ({ subCat }: { subCat: ServiceSubcategory }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <li className="mb-5 flex items-center justify-between rounded-2xl bg-darkGlass px-5">
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
                <UpdateSubService subService={subCat} closeModal={closeModal} />
            </ModalDialog>
        </>
    );
};

AdminViewServices.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <AdminLayout>{page}</AdminLayout>;
            <div className="mt-60 w-full">
                <Footer />
            </div>
        </>
    );
};

export default AdminViewServices;
