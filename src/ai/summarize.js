import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../config/env.js";

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

export async function summarizeText(text) {
  // Debug log
  console.log(
    "🔍 GEMINI_API_KEY status:",
    ENV.GEMINI_API_KEY ? "Present" : "MISSING!",
  );

  try {
    if (
      !ENV.GEMINI_API_KEY ||
      ENV.GEMINI_API_KEY === "your_gemini_api_key_here" ||
      ENV.GEMINI_API_KEY === "undefined"
    ) {
      console.error("⚠️ Gemini API key not configured!");
      console.error("⚠️ Value:", ENV.GEMINI_API_KEY);
      return "AI summary unavailable - please configure Gemini API key.";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `Summarize this YouTube video in 2-3 concise sentences:\n\n${text || "No content available"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    console.log("✅ AI Summary generated successfully");
    return summary || "Summary could not be generated.";
  } catch (err) {
    console.error("❌ AI Summary Error:", err.message);
    return "Summary unavailable due to an error.";
  }
}
