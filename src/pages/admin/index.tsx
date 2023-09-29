import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import AdminLayout from "./layout";

const AdminPage: NextPageWithLayout = () => {
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

    return (
        <div className="text-4xl text-white ">
            <div> Geni Profile Notes here</div>
        </div>
    );
};

AdminPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminPage;
