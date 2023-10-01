import type Session from "@prisma/client";

interface EmailConfirmationProps {
    user: Session.User;
    startDate: Date;
    type: string;
}


export default function EmailConfirmation({
    user,
    startDate,
    type,
}: EmailConfirmationProps) {
    // todo this needs to take in a date / email
    // send an immediate confirmation email
    // send a one week reminder email if the date is more than 7 days away
    // send a one day reminder email

    console.log("user", user);
    console.log("startdate", startDate);
    console.log("type", type);

    return (
        <div>
            <div>
                {`Hi ${user.firstName}, This is an confirmation for your ${type} appointment on date format here. Thank you for booking! `}
            </div>
        </div>
    );
}
