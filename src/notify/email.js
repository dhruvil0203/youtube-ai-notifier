import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

export async function sendEmailNotification(subject, htmlContent) {
  try {
    const info = await transporter.sendMail({
      from: `"YouTube AI Notifier 🎬" <${ENV.EMAIL_USER}>`,
      to: ENV.EMAIL_TO,
      subject,
      html: htmlContent, // HTML content
      text: htmlContent.replace(/<[^>]*>/g, ""), // Plain text fallback
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Email Error:", err.message);
    return false;
  }
}
