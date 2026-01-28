import { fetchLatestVideos } from "./youtube/fetch.js";
import { summarizeText } from "./ai/summarize.js";
import { sendEmailNotification } from "./notify/email.js";
import { loadNotified, saveNotified } from "./storage/store.js";

let notified = loadNotified();

async function run() {
  console.log("📡 YouTube Upload Monitor Running...");

  const videos = await fetchLatestVideos();

  console.log(`🎬 Fetched uploads: ${videos.length}`);

  for (const video of videos) {
    const id = video.id.videoId;

    console.log("🔍 Found upload:", video.snippet.title);

    // Skip already notified videos
    if (notified.includes(id)) {
      console.log("⏭ Skipping already notified:", id);
      continue;
    }

    const title = video.snippet.title;
    const link = `https://youtube.com/watch?v=${id}`;

    // Generate AI summary
    const summary = await summarizeText(title);

    // 📧 Professional Email Subject
    const emailSubject = `🎥 New YouTube Upload — ${title}`;

    // 📧 Professional Email Body
    const emailText = `
🎬 **New YouTube Upload Alert**

📌 **Title:**  
${title}

🧠 **AI Summary:**  
${summary}

🔗 **Watch Here:**  
${link}

━━━━━━━━━━━━━━━━━━━━  
🤖 Sent automatically by  
**YouTube AI Notifier**
`;

    // Send email
    await sendEmailNotification(emailSubject, emailText);

    // Save notified video ID
    notified.push(id);
    saveNotified(notified);

    console.log("✅ Email sent & saved:", title);
  }
}

// Run every 5 minutes
setInterval(run, 1000 * 60 * 5);
run();
