import Image from "next/image";
import giraffe from "@public/giraffe.png";

export default function Footer() {
    return (
        <div className="mt-32 text-white flex w-full items-center justify-center gap-32 bg-darkGlass p-10">
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
            <div className="opacity-75">
                contact | genevieveclare.hair@outlook.com{" "}
            </div>
        </div>
    );
}
