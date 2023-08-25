import { DotLoader } from "react-spinners";
import { api } from "~/utils/api";

export default function ClientDetails({ userId }: { userId: string }) {
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
        <>
            <div>
                <div>{user.name}</div>
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
                <div>{user.notes}</div>
            </div>
        </>
    );
}
