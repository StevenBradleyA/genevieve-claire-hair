// import type Session from "@prisma/client";
// import EmailConfirmation from "~/components/Bookings/Confirmation/EmailConfirmation";
// import { env } from "~/env.mjs";
// import { Resend } from "resend";

// interface SendEmailProps {
//     user: Session.User;
//     startDate: Date;
//     type: string;
// }

// const resend = new Resend(env.NEXT_PUBLIC_RESEND_API_KEY);

// const sendEmail = async ({ user, startDate, type }: SendEmailProps) => {
//     try {
//         const data = await resend.emails.send({
//             from: "Acme <onboarding@resend.dev>",
//             to: [user.email],
//             subject: `Confirmation for Appointment`,
//             react: EmailConfirmation({ user, startDate, type }),
//         });

//         console.log("Email sent successfully:", data);
//         return data;
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error;
//     }
// };

// export { sendEmail };
