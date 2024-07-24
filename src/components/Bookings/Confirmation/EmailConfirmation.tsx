interface EmailConfirmationProps {
    firstName: string;
    lastName: string;
    startDate: Date;
    displayDate: string;
    type: string;
    classification: string;
}

export default function EmailConfirmation({
    firstName,
    lastName,
    type,
    startDate,
    displayDate,
    classification,
}: EmailConfirmationProps) {
    return (
        <>
            {classification === "create" && (
                <div>
                    {`Hi ${firstName} ${lastName}, This is a confirmation for your ${type} appointment with Genevieve at ${displayDate}. The address is 160 NW Gilman Blvd Suite 418 Issaquah, WA. The Keypad code is #1111. Thank you for booking! 
                    - Geni
                `}
                </div>
            )}
            {classification === "update" && (
                <div>
                    {`Hi ${firstName} ${lastName}, This is a confirmation for your updated ${type} appointment with Genevieve at ${displayDate}. The address is 160 NW Gilman Blvd Suite 418 Issaquah, WA. The Keypad code is #1111. Thank you for booking! 
                    - Geni
                `}
                </div>
            )}
            {classification === "delete" && (
                <div>
                    {`Hi ${firstName} ${lastName}, This is a confirmation that your ${type} appointment with Genevieve at ${displayDate} has been cancelled. If you have any questions, please reach out!
                    - Geni
                `}
                </div>
            )}
        </>
    );
}
