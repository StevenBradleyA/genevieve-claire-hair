import { DotLoader } from "react-spinners";
import { api } from "~/utils/api";
import type { User } from "@prisma/client";
import EachClientCard from "~/components/Clients";
import giraffe from "../../../public/giraffe.png";
import Image from "next/image";

export default function AdminPage() {
    // ! square texts her clients with she books them
    // ! could we do an email confirmation to them? when they book?
    // TODO add admin only viewing or redirect if user is not admin
    // TODO Going to need services db setup fixed cost optional rate optional
    // TODO fix new client form so that notes and images are saving for a new client
    // TODO MAYBE ONLY WANT TO SHOW NON NEWCLIENTS?? This could keep weird google profile names from showing etc...
    // Want ability to change pricing page
    // Geni can add stuff to calendar in the booking page probs

    // maybe a calendar with a view?

    // custom checkout here? custom calculator
    // product drop down with checkout too.
    // select service + additional time.

    // would want to be able to close off books here or change calendar availability

    // square checkout implementation

    // list all clients alphabetically with a search
    // clicking on a client opens a admin/clientId/# that shows clients prev services with date with photos of client and client notes

    // purchase log
    // sell product through this page????

    const { data: users, isLoading } = api.user.getAllUsers.useQuery();

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Users are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!users) return <div>Oops</div>;

    console.log(users);

    return (
        <div className="text-4xl text-white ">
            <div>Client Checkout</div>
            <div className="mb-20"> Product Checkout dropdown </div>

            <div> Calendar that shows schedule </div>
            <div className="mb-10">
                {" "}
                Ability to change calendar availability
            </div>

            <div className="mb-5"> Ability to change pricing </div>

            <div className="mb-10 flex items-end justify-center gap-5 font-grand-hotel text-6xl">
                {" "}
                Clients
                <Image
                    src={giraffe}
                    alt="giraffe"
                    width={giraffe.width}
                    height={giraffe.height}
                    className="w-24 object-cover"
                />
            </div>
            <div className=" mb-20 flex flex-col justify-center rounded-2xl bg-glass p-20 shadow-xl">
                {users.map((user: User, i: number) => {
                    return <EachClientCard key={i} user={user} i={i} />;
                })}
            </div>
        </div>
    );
}
