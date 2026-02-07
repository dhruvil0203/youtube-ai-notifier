# 📺 YouTube Upload Notifier with AI Summary

A production-ready automation tool that monitors YouTube channels for new uploads, generates AI summaries using Google Gemini, and sends professional email notifications automatically.

**Perfect for:** Staying updated on your favorite creators without manually checking YouTube!

---

## ✨ Features

- ✅ Monitors YouTube channels at your preferred interval
- ✅ Detects new videos & Shorts
- ✅ Generates AI-powered summaries using Google Gemini
- ✅ Sends beautiful email alerts via Gmail
- ✅ Prevents duplicate notifications
- ✅ Runs 24/7 in the background

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Gmail account with 2-Step Verification enabled
- YouTube Data API key
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dhruvil0203/youtube-ai-notifier.git
   cd youtube-ai-notifier
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:

   ```env
   # YouTube Configuration
   YOUTUBE_API_KEY=your_youtube_api_key_here
   CHANNEL_ID=your_channel_id_here

   # Google Gemini Configuration
   GEMINI_API_KEY=your_gemini_api_key_here

   # Email Configuration
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your_gmail_app_password_here
   EMAIL_TO=recipient@example.com
   ```

4. **Run the application**
   ```bash
   node src/index.js
   ```

---

## 🔑 Getting API Keys

### YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **YouTube Data API v3** from the API Library
4. Navigate to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Get API Key** or **Create API Key**
4. Select **Create API key in new project** (or use an existing project)
5. Copy your API key

> **Note:** Gemini API offers a generous free tier with rate limits suitable for personal projects.

### Gmail App Password

1. Enable [2-Step Verification](https://myaccount.google.com/security)
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select **Mail** and **Other (Custom name)**
4. Name it "YouTube Notifier"
5. Copy the 16-character password

> **Important:** Never use your regular Gmail password.

### YouTube Channel ID

**Option 1:** If the URL is `youtube.com/channel/UCxxxxxxxxxx`, use `UCxxxxxxxxxx`

**Option 2:** For `youtube.com/@username` format, use this [Channel ID Finder](https://commentpicker.com/youtube-channel-id.php)

---

## 📧 Email Notification Example

**Subject:** 🎥 New YouTube Upload — How to Build Node.js Apps

**Body:**

```
🎬 New YouTube Upload Alert

📌 Title: How to Build Scalable Node.js Applications

🧠 AI Summary:
This video covers best practices for building scalable Node.js
applications, including microservices architecture, caching
strategies, and load balancing techniques.

🔗 Watch Here: https://youtube.com/watch?v=abc123xyz

━━━━━━━━━━━━━━━━━━━━
🤖 Sent automatically by YouTube AI Notifier
```

---

## 🌐 Deploy for 24/7 Operation

### Railway (Recommended - Free Tier)

1. Push your code to GitHub (exclude `.env`)
2. Sign up at [railway.app](https://railway.app)
3. Click **New Project** → **Deploy from GitHub repo**
4. Add environment variables in the **Variables** tab
5. Deploy automatically

---

## ⚙️ Customization

### Change Check Frequency

Edit `src/index.js` to set your preferred monitoring interval:

```javascript
// Check every 5 minutes
setInterval(run, 1000 * 60 * 5);

// Check every 1 minute (not recommended - may hit API limits)
setInterval(run, 1000 * 60 * 1);

// Check every 10 minutes
setInterval(run, 1000 * 60 * 10);

// Check every 30 minutes
setInterval(run, 1000 * 60 * 30);

// Check every 1 hour
setInterval(run, 1000 * 60 * 60);
```

> **Tip:** Choose an interval based on how frequently your channel uploads. For daily uploaders, 5-10 minutes works well. For weekly uploaders, 30-60 minutes is sufficient.

### Customize AI Summary Style

Edit `src/ai/summarize.js`:

```javascript
{
  role: "system",
  content: "Summarize this YouTube video in 3 sentences with key points."
}
```

---

---

## 📄 License

MIT License - Free to use for personal or commercial projects.

---

**Built with ❤️ using Node.js & AI**

⭐ If this project helped you, give it a star on GitHub!
