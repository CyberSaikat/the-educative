import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY;

export default async function SendMailer(
  email: string,
  subject: string,
  html: string,
  react?: any,
) {
  const resend = new Resend(API_KEY);

  const mail = await resend.emails.send({
    from: "Codes Engineer <noreply@codes.engineer>",
    reply_to: "saikatroydot@gmail.com",
    to: email,
    subject: subject,
    html: html,
  });

  return mail;
}
