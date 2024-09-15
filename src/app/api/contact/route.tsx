import SendMailer from "@/utils/sendMailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  const notificationTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f7f9; margin: 0; padding: 0; }
        .container { max-width: 99%;}
        h1 { color: #2c3e50; text-align: center; animation: fadeIn 0.8s ease-out; }
        .info { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px; animation: fadeIn 0.8s ease-out 0.2s both; }
        .message { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); animation: fadeIn 0.8s ease-out 0.4s both; }
        h2 { color: #3498db; }
        @media only screen and (max-width: 600px) {
          .container { width: 99% !important; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Contact Form Submission</h1>
        <div class="info">
          <h2>Sender Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div class="message">
          <h2>Message Content</h2>
          <p>${message}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const autoReplyTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f7f9; margin: 0; padding: 0; }
        .container { max-width: 99%;}
        h1 { color: #2c3e50; text-align: center; animation: slideIn 0.8s ease-out; }
        .message { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); animation: slideIn 0.8s ease-out 0.2s both; }
        .highlight { background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin-top: 20px; animation: slideIn 0.8s ease-out 0.4s both; }
        @media only screen and (max-width: 600px) {
          .container { width: 99% !important; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank You for Contacting Us</h1>
        <div class="message">
          <p>Dear ${name},</p>
          <p>We have received your message and appreciate you taking the time to reach out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
          <div class="highlight">
            <h2>Your Message Summary</h2>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message.substring(0, 100)}${
    message.length > 100 ? "..." : ""
  }</p>
          </div>
          <p>If you have any additional information to provide, please don't hesitate to reply to this email.</p>
          <p>Best regards,<br>The Educative</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await SendMailer(
      "saikatroydot@gmail.com",
      `New Contact: ${subject}`,
      notificationTemplate
    );
    await SendMailer(email, "Thank you for contacting us", autoReplyTemplate);
    return NextResponse.json("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json("Error sending email", { status: 500 });
  }
}
