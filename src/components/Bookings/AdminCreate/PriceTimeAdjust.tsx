export default function PriceTimeAdjust({
    originalPrice,
    originalTime,
    customPrice,
    customTime,
    setCustomPrice,
    setCustomTime,
}: {
    originalPrice: number;
    originalTime: number;
    customPrice: number;
    customTime: number;
    setCustomPrice: React.Dispatch<React.SetStateAction<number>>;
    setCustomTime: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <>
            <div className="flex gap-5 text-xl">
                <div className="flex flex-col">
                    <div>Standard price for this booking: ${originalPrice}</div>
                    <div>
                        Standard time this booking takes: {originalTime} min
                    </div>
                </div>
                <div className="flex flex-col">
                    <label>
                        Custom price:
                        <input
                            className="ml-2 rounded-xl bg-darkGlass p-1"
                            value={customPrice}
                            onChange={(e) => {
                                const num = e.target.value;
                                if (!num.length) setCustomPrice(0);
                                if (!Number(num)) return;

                                if (num.length > 1 && num[0] === "0") {
                                    setCustomPrice(Number(num.slice(1)));
                                } else setCustomPrice(Number(num));
                            }}
                        />
                    </label>
                    <label>
                        Custom time:
                        <input
                            className="ml-2 rounded-xl bg-darkGlass p-1"
                            value={customTime}
                            onChange={(e) =>
                                setCustomTime(Number(e.target.value))
                            }
                        />
                    </label>
                </div>
                <button
                    onClick={() => {
                        setCustomPrice(originalPrice);
                        setCustomTime(originalTime);
                    }}
                    className="my-4 rounded-2xl bg-blue-300 px-6 py-2 text-xl"
                >
                    Reset
                </button>
            </div>
        </>
    );
}
