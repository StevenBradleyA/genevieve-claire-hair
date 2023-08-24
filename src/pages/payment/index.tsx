import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { env } from "~/env.mjs";

export default function Payment() {
    return (
        <div>
            <PaymentForm
                applicationId={env.NEXT_PUBLIC_SQUARE_APP_ID}
                locationId={env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
                cardTokenizeResponseReceived={(token, buyer): void => {
                    alert(JSON.stringify(token, null, 2));
                }}
            >
                <CreditCard />
            </PaymentForm>
        </div>
    );
}
