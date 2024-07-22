import Image from "next/image";
import Link from "next/link";
import giraffe from "@public/Logos/giraffe.png";

export default function Footer() {
    return (
        <div className="mt-32 flex w-full items-center justify-center gap-32 bg-darkGlass p-10 text-white">
            <div className="flex flex-col">
                <div className="opacity-75">
                    inspired by the capes Geni uses in her salon
                </div>
                <div>
                    Powered by <button>Hacktime</button> | @ 2023 Genevieve
                    Clare Hair
                </div>
            </div>
            <Image alt="giraffe-logo" src={giraffe} className="w-20" />
            <div className="flex flex-col opacity-75">
                <div>contact | genevieveclare.hair@outlook.com </div>

                <Link href="/terms-of-service" aria-label="Terms of Service">
                    terms of service
                </Link>
                <Link href="/privacy-policy" aria-label="Privacy Policy">
                    privacy policy
                </Link>
            </div>
        </div>
    );
}
