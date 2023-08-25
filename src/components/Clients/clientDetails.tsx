import Image from "next/image";
import { DotLoader } from "react-spinners";
import { api } from "~/utils/api";

export default function ClientDetails({ userId }: { userId: string }) {
    // TODO ALLOW ADMIN to edit and update notes
    const { data: user, isLoading } = api.user.getUserById.useQuery(userId);

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Loading User</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!user) return <div>Oops</div>;

    return (
        <div className="mb-20 flex w-2/3 flex-col items-center justify-center rounded-2xl bg-glass p-10 text-white shadow-xl">
            <div className="mb-5 flex gap-5 text-5xl font-bold">
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
            </div>
            {user.images && user.images.length > 0 && (
                <div className="flex items-center justify-center gap-5">
                    {user.images.map((e, i) => (
                        <div key={i}>
                            <Image
                                src={e.link}
                                alt="client"
                                width={200}
                                height={200}
                                className="w-40"
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-5 text-5xl font-bold">Contact</div>
            <div className=" mt-3 text-2xl">{user.email}</div>

            <div className="mt-5 text-5xl font-bold">Notes</div>
            <div className="mx-56 mt-3 rounded-2xl bg-chillPurple p-6 ">
                <p className="text-xl ">{user.notes}</p>
            </div>
        </div>
    );
}
