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
    const description = video.snippet.description || "No description available";
    const thumbnail = video.snippet.thumbnails.high.url;
    const publishedAt = new Date(video.snippet.publishedAt).toLocaleString(
      "en-US",
      {
        dateStyle: "full",
        timeStyle: "short",
      },
    );
    const link = `https://youtube.com/watch?v=${id}`;

    // Generate AI summary from title and description
    const summary = await summarizeText(
      `Title: ${title}\n\nDescription: ${description}`,
    );

    // 📧 Professional Email Subject
    const emailSubject = `🎥 New Upload Alert: ${title}`;

    // 📧 Professional HTML Email Body
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 8px 0 0 0;
      opacity: 0.9;
      font-size: 14px;
    }
    .thumbnail {
      width: 100%;
      height: auto;
      display: block;
    }
    .content {
      padding: 30px 20px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .video-title {
      font-size: 22px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 15px 0;
      line-height: 1.3;
    }
    .summary {
      background-color: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 15px;
      border-radius: 4px;
      font-size: 15px;
      color: #555;
    }
    .meta-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }
    .watch-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      transition: transform 0.2s;
    }
    .watch-button:hover {
      transform: translateY(-2px);
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e9ecef;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: #666;
    }
    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e0e0e0, transparent);
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎬 New YouTube Upload</h1>
      <p>Your favorite channel just posted!</p>
    </div>

    <!-- Thumbnail -->
    <img src="${thumbnail}" alt="Video Thumbnail" class="thumbnail">

    <!-- Content -->
    <div class="content">
      <!-- Video Title -->
      <div class="section">
        <div class="section-title">📌 Video Title</div>
        <h2 class="video-title">${title}</h2>
      </div>

      <!-- Published Date -->
      <div class="meta-info">
        <span>🕒 Published:</span>
        <strong>${publishedAt}</strong>
      </div>

      <div class="divider"></div>

      <!-- AI Summary -->
      <div class="section">
        <div class="section-title">🧠 AI-Generated Summary</div>
        <div class="summary">
          ${summary}
        </div>
      </div>

      <div class="divider"></div>

      <!-- Watch Button -->
      <div style="text-align: center; margin-top: 30px;">
        <a href="${link}" class="watch-button">
          ▶️ Watch Now on YouTube
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>🤖 Automated notification by <strong>YouTube AI Notifier</strong></p>
      <p style="color: #999; font-size: 12px;">Powered by Gemini AI & Node.js</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email with HTML
    await sendEmailNotification(emailSubject, emailHtml);

    // Save notified video ID
    notified.push(id);
    saveNotified(notified);

    console.log("✅ Email sent & saved:", title);

    // Small delay between processing videos to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

const CHECK_INTERVAL = 1000 * 60 * 60;

console.log(
  `🚀 Starting YouTube Monitor (checking every ${CHECK_INTERVAL / 60000} minutes)`,
);
setInterval(run, CHECK_INTERVAL);

run();
