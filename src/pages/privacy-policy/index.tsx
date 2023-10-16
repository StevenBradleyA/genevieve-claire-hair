import Footer from "~/components/HomePage/footer";

export default function PrivacyPolicy() {
    return (
        <>
            <div className="w-1/2 text-violet-300">
                <div className="flex justify-center text-5xl ">
                    Privacy Policy
                </div>
                <p className="mb-5 rounded-2xl bg-darkGlass p-4 text-white ">
                    <p className="mb-5 rounded-2xl bg-darkGlass p-4 text-white ">
                        By accessing this Website, accessible from
                        genevieveclare.hair, you are agreeing to be bound by
                        these Website Terms of Service and agree that you are
                        responsible for the agreement in accordance with any
                        applicable local laws. IF YOU DO NOT AGREE TO ALL THE
                        TERMS AND CONDITIONS OF THIS AGREEMENT, YOU ARE NOT
                        PERMITTED TO ACCESS OR USE OUR SERVICES.
                    </p>
                </p>

                <div className="mb-5 flex justify-between text-white">
                    <div>Effective 10-15-2023</div>
                    <div>Last updated on 10-15-2023</div>
                </div>

                <div className="mb-5 text-4xl ">
                    Personal Information Request
                </div>
                <p className="mb-5 rounded-2xl bg-darkGlass p-4 text-white">
                    You have the right to request access to the personal
                    information we collect from you, change that information, or
                    delete it. To request to review, update, or delete your
                    personal information, please visit: email
                    genevieveclare.hair@outlook.com to request data stored.
                </p>

                <div className="mb-5 text-4xl "> Cookie Policy</div>
                <div>this site uses cookies to check if you are logged in </div>

            </div>
            <Footer />
        </>
    );
}
