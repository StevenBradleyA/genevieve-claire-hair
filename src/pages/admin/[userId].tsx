import { useRouter } from "next/router";

export default function ClientProfile() {
    const router = useRouter();
    const { userId } = router.query;

    console.log(userId);


    // const { data: users, isLoading } = api.user.getAllUsers.useQuery();

    // if (isLoading)
    //     return (
    //         <div className=" mt-10 flex flex-col items-center justify-center gap-16">
    //             <div className="text-lg text-white">Users are loading</div>{" "}
    //             <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
    //         </div>
    //     );

    // if (!users) return <div>Oops</div>;

    // console.log(users);


    return (
        <div className="flex">
            <h1> client details</h1>
            {/* <div>{user.name}</div>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.notes}</div> */}
        </div>
    );
}
