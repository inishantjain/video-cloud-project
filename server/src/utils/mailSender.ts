import nodemailer from "nodemailer";
import { CustomError } from "../errors/custom-error";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  name: "my-video-cloud-project.vercel.app", //FIXME: this is a dummy name
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  logger: process.env.NODE_ENV?.toLowerCase() !== "production", // log to console
} as SMTPTransport.Options);

export const mailSender = async function (email: string, title: string, body: string) {
  try {
    let info = await transporter.sendMail({
      from: "ferventpare@imcourageous.com",
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error: any) {
    console.error(error?.message);
    throw new CustomError("Error sending mail");
  }
};
