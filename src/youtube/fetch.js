import { google } from "googleapis";
import { ENV } from "../config/env.js";

const youtube = google.youtube({
  version: "v3",
  auth: ENV.YOUTUBE_API_KEY,
});

/**
 * Fetch latest uploads (Videos + Shorts)
 */
export async function fetchLatestVideos() {
  try {
    const res = await youtube.search.list({
      part: "snippet",
      channelId: ENV.CHANNEL_ID,
      order: "date",
      maxResults: 15,
      type: "video",
    });

    return res.data.items || [];
  } catch (err) {
    console.error("❌ YouTube Fetch Error:", err.message);
    return [];
  }
}
