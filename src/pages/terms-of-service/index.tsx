export default function TermsOfService() {
    return (
        <div className="w-1/2 text-violet-300">
            <div className="flex justify-center text-5xl ">
                Terms of Service
            </div>
            <div className="mb-5 flex justify-between text-white">
                <div className="rounded-lg bg-darkGlass p-2">
                    Effective 10-15-2023
                </div>
                <div className="rounded-lg bg-darkGlass p-2">
                    Last updated on 10-15-2023
                </div>
            </div>

            <div className="mb-5 text-4xl "> Agreement</div>
            <p className="mb-5 rounded-2xl bg-darkGlass p-4 text-white ">
                By accessing this Website, accessible from genevieveclare.hair,
                you are agreeing to be bound by these Website Terms of Service
                and agree that you are responsible for the agreement in
                accordance with any applicable local laws. IF YOU DO NOT AGREE
                TO ALL THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU ARE NOT
                PERMITTED TO ACCESS OR USE OUR SERVICES.
            </p>

            <div className="mb-5 text-4xl "> Links</div>
            <p className="mb-5 rounded-2xl bg-darkGlass p-4 text-white">
                {`Genevieveclaire.hair is not responsible for the contents of any
                linked sites. The use of any linked website is at the user's own
                risk.`}
            </p>
            <div className="mb-5 text-4xl "> Changes</div>
            <p className="mb-5 rounded-2xl bg-darkGlass p-4 text-white">
                Genevieveclare.hair may revise these Terms of Service for its
                Website at any time without prior notice. By using this Website,
                you are agreeing to be bound by the current version of these
                Terms of Service.
            </p>
            <div className="mb-5 text-4xl "> Contact</div>
            <div className="mb-5 text-4xl "> Limitations</div>
            <div className="mb-5 text-4xl "> Disclaimer</div>
            <div className="mb-5 text-4xl "> Privacy Policy</div>

            <div>this site uses cookies to check if you are logged in </div>
        </div>
    );
}
