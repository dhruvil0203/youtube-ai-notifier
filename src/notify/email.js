import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

export async function sendEmailNotification(subject, text) {
  try {
    const info = await transporter.sendMail({
      from: ENV.EMAIL_USER,
      to: ENV.EMAIL_TO,
      subject,
      text,
    });

    console.log("✅ Email sent successfully:", info.response);
  } catch (err) {
    console.error("❌ Email Error:", err);
  }
}
