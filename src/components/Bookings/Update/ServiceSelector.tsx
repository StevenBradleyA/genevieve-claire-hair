import type { NormalizedServicesType } from "~/server/api/routers/service";

// TODO: Manage state to update booking

export default function ServiceSelector({
    serviceData,
}: {
    serviceData: NormalizedServicesType;
}) {
    const mainServices = Object.keys(serviceData);

    console.log(mainServices);

    return (
        <div className="flex gap-5 text-2xl">
            {mainServices.map((main, i) => {
                return (
                    <div key={`${main}-${i}`}>
                        <input type="checkbox" />
                        <label>{main}</label>
                        <div className="flex flex-col text-lg">
                            {serviceData[main]?.subcategories &&
                                serviceData[main]?.subcategories.map(
                                    (sub, j) => {
                                        return (
                                            <div key={`${sub.name}-${j}`}>
                                                <input type="checkbox" />
                                                <label>{sub.name}</label>
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
