import nodemailer from "nodemailer";

export const sendMail = async ({}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "username",
        pass: "password",
      },
    });
  } catch (error) {}
};
