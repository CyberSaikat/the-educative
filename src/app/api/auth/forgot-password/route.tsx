import conn from "@/database/config";
import User from "@/models/user";
import SendMailer from "@/utils/sendMailer";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function POST(request: NextRequest) {
  conn();

  let host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const body = await request.json();
  const email = body.email;
  const currentYear = new Date().getFullYear();
  if (!email) {
    return NextResponse.json(
      { message: "Please fill in all fields" },
      { status: 400 }
    );
  }

  if (email) {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user) {
      let token = Math.random().toString(36).substr(2, 5);
      user.reset_key = token;
      user.reset_key_expires = Date.now() + 3600000; // 1 hour
      await user.save();
      let url = `${protocol}://${host}/reset-password/${token}`;
      const subject = "Password Reset";
      let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4a90e2;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 20px;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            background-color: #4a90e2;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.8em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Password Reset Request</h1>
    </div>
    <div class="content">
        <p>Hello ${user.name},</p>
        <p>We received a request to reset your password for your account. Don't worry, we've got you covered!</p>
        <p>To reset your password, simply click the button below:</p>
        <a href="${url}" class="button">Reset My Password</a>
        <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        <p>This link will expire in 24 hours for security reasons.</p>
        <p>If you're having trouble with the button above, copy and paste the following link into your browser:</p>
        <a href="${url}">${url}</a>
        <p>Best regards,<br>The Educative Team</p>
    </div>
    <div class="footer">
        <p>This is an automated message, please do not reply to this email. If you need assistance, please contact our support team.</p>
        <p>&copy; ${currentYear} The Educative. All rights reserved.</p>
    </div>
</body>
</html>`;
      const mail = await SendMailer(user.email, subject, html);
      console.log(url);
      if (mail.error) {
        return NextResponse.json(
          { message: "Email not sent", error: mail.error},
          { status: 500 }
        );
      }

      return NextResponse.json({ message: "Email sent" });
    }
  }

  return NextResponse.json({ message: "Email sent" });
}
