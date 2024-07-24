import Image from "next/image";
import heart from "@public/Logos/heart-logo.png";

export default function BookingConfirmed() {
    // <div className="flex flex-col items-center justify-center rounded-3xl bg-glass p-20 text-4xl text-white shadow-xl ">
    //     <div className="mb-10">Thank you for booking!</div>

    //     <div className="text-2xl">
    //         A confirmation text or email will be sent for your appointment
    //     </div>
    // </div>

    // add address etc...
    
    return (
        <div className="flex w-full justify-center px-5 text-white">
            <div className="mt-20 flex h-72 w-1/3 flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 p-10 shadow-xl">
                <Image
                    src={heart}
                    alt="heart logo"
                    className="image-black-to-white h-10 w-10 object-contain"
                />

                <h1 className="mt-3 text-xl ">{`Thank you for booking!`}</h1>
                <ul className="mt-3 rounded-xl bg-white p-2">
                    <li className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                        160 NW Gilman Blvd Suite 418
                    </li>
                    <li className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                        Issaquah, WA
                    </li>
                    <li className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                       Keypad code #1111
                    </li>
                </ul>

                <div className="mt-3 flex flex-col items-center gap-1 text-purple-300">
                    <div className="rounded-full bg-white p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 -0.5 20 20"
                            version="1.1"
                        >
                            <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <g
                                    transform="translate(-260.000000, -2759.000000)"
                                    fill="currentColor"
                                >
                                    <g transform="translate(56.000000, 160.000000)">
                                        <path d="M222,2612.40709 C222,2612.84565 221.729,2613.23594 221.324,2613.3787 L215,2615.60539 L215,2603.71501 L215,2603.53322 L220.676,2601.53454 C221.325,2601.3055 222,2601.80055 222,2602.50615 L222,2612.40709 Z M213,2603.71501 L213,2615.60539 L206.676,2613.3787 C206.271,2613.23594 206,2612.84565 206,2612.40709 L206,2602.50615 C206,2601.80055 206.675,2601.3055 207.324,2601.53454 L213,2603.53322 L213,2603.71501 Z M221.337,2599.11785 L214.331,2601.64444 C214.117,2601.72147 213.883,2601.72147 213.669,2601.64444 L206.663,2599.11785 C205.362,2598.64847 204,2599.6396 204,2601.05592 L204,2613.11577 C204,2613.997 204.547,2614.78065 205.36,2615.06207 L213.68,2617.94608 C213.888,2618.01797 214.112,2618.01797 214.32,2617.94608 L222.64,2615.06207 C223.453,2614.78065 224,2613.997 224,2613.11577 L224,2601.05592 C224,2599.6396 222.638,2598.64847 221.337,2599.11785 L221.337,2599.11785 Z"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>

                    <h2 className="rounded-3xl bg-white px-4 py-1 text-xs">
                        Bookings
                    </h2>
                </div>
            </div>
        </div>
    );
}
