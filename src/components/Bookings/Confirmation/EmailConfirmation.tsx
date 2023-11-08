interface EmailConfirmationProps {
    firstName: string;
    lastName: string;
    startDate: Date;
    displayDate: string;
    type: string;
}

export default function EmailConfirmation({
    firstName,
    lastName,
    type,
    startDate,
    displayDate,
}: EmailConfirmationProps) {
    return (
        <div>
            {`Hi ${firstName} ${lastName}, This is an confirmation for your ${type} appointment with Genevieve at ${displayDate}. Thank you for booking! 
                - Geni
            `}
        </div>
    );
}
