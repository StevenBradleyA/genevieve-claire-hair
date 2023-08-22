import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

export default function Payment() {
    return (
        <div>
            <PaymentForm
                applicationId=""
                locationId=""
                cardTokenizeResponseReceived={(token, buyer): void => {
                    alert(JSON.stringify(token, null, 2));
                }}
            >
                <CreditCard />
            </PaymentForm>
        </div>
    );
}
