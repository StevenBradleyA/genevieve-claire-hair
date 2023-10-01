interface EmailConfirmationProps {
    firstName: string;
    lastName: string;
    startDate: Date;
    type: string;
}

export default function EmailConfirmation({
    firstName,
    lastName,
    type,
    startDate,
}: EmailConfirmationProps) {
    const formattedDate = startDate.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <div>
            {`Hi ${firstName} ${lastName}, This is an confirmation for your ${type} appointment on ${formattedDate}. Thank you for booking! 
                - Geni
            `}
        </div>
    );
}
