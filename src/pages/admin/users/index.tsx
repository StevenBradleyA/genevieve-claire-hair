import { api } from "~/utils/api";
import EachClientCard from "~/components/Clients";
import giraffe from "@public/Logos/giraffe.png";
import Image from "next/image";
import AdminLayout from "../layout";
import { DotLoader } from "react-spinners";
import type { User } from "@prisma/client";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ReactElement } from "react";
import { useSession } from "next-auth/react";
import Custom404 from "~/pages/404";
import Footer from "~/components/Footer/footer";

const AdminViewUsers: NextPageWithLayout = () => {
    const { data: users, isLoading } = api.user.getAllUsers.useQuery();
    const { data: session } = useSession();

    const accessDenied = !session || !session.user.isAdmin;

    if (accessDenied) {
        return <Custom404 />;
    }

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Users are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!users) return <div>Oops</div>;

    return (
        <>
            <h1 className="mb-10 flex items-end justify-center gap-5 font-archivo text-8xl text-white">
                CLIENTS
            </h1>
            <div className="flex w-full justify-center text-white">
                <div className=" mb-20 flex w-2/3 flex-col items-center justify-center rounded-2xl bg-glass p-20 text-2xl shadow-xl ">
                    {users.map((user: User, i: number) => {
                        return <EachClientCard key={i} user={user} i={i} />;
                    })}
                </div>
            </div>
        </>
    );
};

AdminViewUsers.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <AdminLayout>{page}</AdminLayout>;
            <div className="mt-60 w-full">
                <Footer />
            </div>
        </>
    );
};

export default AdminViewUsers;
