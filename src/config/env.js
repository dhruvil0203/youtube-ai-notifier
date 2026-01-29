import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  CHANNEL_ID: process.env.CHANNEL_ID,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_TO: process.env.EMAIL_TO,
};
