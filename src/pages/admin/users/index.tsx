import { api } from "~/utils/api";
import EachClientCard from "~/components/Clients";
import giraffe from "@public/icons/giraffe.png";
import Image from "next/image";
import AdminLayout from "../layout";
import { DotLoader } from "react-spinners";
import type { User } from "@prisma/client";
import type { NextPageWithLayout } from "~/pages/_app";
import type { ReactElement } from "react";

const AdminViewUsers: NextPageWithLayout = () => {
    const { data: users, isLoading } = api.user.getAllUsers.useQuery();

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Users are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!users) return <div>Oops</div>;

    return (
        <div className="flex flex-col text-white ">
            <div className="mb-10 flex items-end justify-center gap-5 font-grand-hotel text-6xl">
                Clients
                <Image
                    src={giraffe}
                    alt="giraffe"
                    width={giraffe.width}
                    height={giraffe.height}
                    className="w-24 object-cover"
                />
            </div>
            <div className=" mb-20 flex flex-col justify-center rounded-2xl bg-glass p-20 text-2xl shadow-xl">
                {users.map((user: User, i: number) => {
                    return <EachClientCard key={i} user={user} i={i} />;
                })}
            </div>
        </div>
    );
};

AdminViewUsers.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminViewUsers;
