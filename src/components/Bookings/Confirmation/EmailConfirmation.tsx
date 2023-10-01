
interface EmailConfirmationProps {
    firstName: string;
    lastName: string;
    type: string;
}

export default function EmailConfirmation({
    firstName,
    lastName,
    type,
}: EmailConfirmationProps) {
    // todo this needs to take in a date / email
    // send an immediate confirmation email
    // send a one week reminder email if the date is more than 7 days away
    // send a one day reminder email

    return (
        <div>
            <div>
                {`Hi ${firstName} ${lastName}, This is an confirmation for your ${type} appointment on date format here. Thank you for booking! `}
            </div>
        </div>
    );
}
