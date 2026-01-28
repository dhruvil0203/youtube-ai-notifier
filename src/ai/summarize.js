import OpenAI from "openai";
import { ENV } from "../config/env.js";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

export async function summarizeText(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize this YouTube Video in short summery.",
        },
        { role: "user", content: text || "No transcript available" },
      ],
    });
    return completion.choices[0].message.content;
  } catch (err) {
    console.error("AI Summary Error:", err.message);
    return "Summary unavailable.";
  }
}
