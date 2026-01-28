# 📺 YouTube Upload Notifier with AI Summary

A production-ready automation tool that monitors YouTube channels for new uploads, generates AI summaries using OpenAI, and sends professional email notifications automatically.

**Perfect for:** Staying updated on your favorite creators without manually checking YouTube!

---

## ✨ What This Does

1. ✅ Monitors a YouTube channel every **5 minutes**
2. ✅ Detects new **videos & Shorts**
3. ✅ Generates **AI-powered summaries**
4. ✅ Sends **beautiful email alerts**
5. ✅ Prevents duplicate notifications
6. ✅ Runs **24/7 in the background**

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Get Your API Keys

You'll need 3 things:

**1. YouTube API Key** (Free)

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project → Enable "YouTube Data API v3"
- Create credentials (API Key) → Copy it

**2. OpenAI API Key** ($5 free credit for new users)

- Sign up at [OpenAI Platform](https://platform.openai.com/api-keys)
- Create new secret key → Copy it

**3. Gmail App Password** (Free)

- Go to [Google Account Security](https://myaccount.google.com/security)
- Enable **2-Step Verification** first
- Then go to [App Passwords](https://myaccount.google.com/apppasswords)
- Generate password for "Mail" → Copy it

**Pro Tip:** Never use your real Gmail password - only the App Password!

### Step 3: Find Your YouTube Channel ID

Visit the YouTube channel you want to monitor:

- If URL is `youtube.com/channel/UCxxxxxxxxxx` → Use `UCxxxxxxxxxx`
- If URL is `youtube.com/@username` → Use this [Channel ID Finder](https://commentpicker.com/youtube-channel-id.php)

### Step 4: Create `.env` File

Create a file named `.env` in your project root:

```env
# YouTube Configuration
YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXX
CHANNEL_ID=UCxxxxxxxxxxxxxxxxxx

# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# Email Configuration
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
EMAIL_TO=recipient@example.com
```

⚠️ **Important:** Never commit this file to GitHub!

### Step 5: Run It!

```bash
node src/index.js
```

**You should see:**

```
📡 YouTube Upload Monitor Running...
🎬 Fetched uploads: 10
✅ Email sent & saved: Video Title
```

---

## 📧 What You'll Receive

When a new video is uploaded, you'll get an email like this:

**Subject:** 🎥 New YouTube Upload — How to Build Node.js Apps

**Body:**

```
🎬 New YouTube Upload Alert

📌 Title:
How to Build Scalable Node.js Applications

🧠 AI Summary:
This video covers best practices for building scalable Node.js
applications, including microservices architecture, caching
strategies, and load balancing techniques.

🔗 Watch Here:
https://youtube.com/watch?v=abc123xyz

━━━━━━━━━━━━━━━━━━━━
🤖 Sent automatically by YouTube AI Notifier
```

---

## 🌐 Deploy for 24/7 Operation (Recommended)

Running this on your computer works, but it stops when you shut down your PC. For true 24/7 monitoring, deploy to the cloud:

### Railway (Easiest - Free Tier Available)

**Time needed: 10 minutes**

1. Push your code to GitHub (don't commit `.env`!)
2. Go to [railway.app](https://railway.app) and sign up
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Go to "Variables" tab and add all your environment variables:
   ```
   YOUTUBE_API_KEY
   CHANNEL_ID
   OPENAI_API_KEY
   EMAIL_USER
   EMAIL_PASS
   EMAIL_TO
   ```
6. Railway will automatically deploy!

**Done!** Your notifier is now running 24/7 for free.

### Other Cloud Options

- **Render** - [render.com](https://render.com) (Free tier, similar to Railway)
- **Heroku** - [heroku.com](https://heroku.com) ($7/month)
- **AWS EC2** - [aws.amazon.com](https://aws.amazon.com) (Free tier for 12 months)

All these platforms handle process management automatically - no PM2 needed!

---

## ⚙️ Customization

### Change Check Frequency

Edit `src/index.js` and modify this line:

```javascript
// Check every 5 minutes (default)
setInterval(run, 1000 * 60 * 5);

// Other options:
// Every 10 minutes: setInterval(run, 1000 * 60 * 10);
// Every 1 hour: setInterval(run, 1000 * 60 * 60);
```

### Customize AI Summary Style

Edit `src/ai/summarize.js`:

```javascript
{
  role: "system",
  content: "Summarize this YouTube video summery in sentences with key points."
  // Or try: "Create an exciting 3-sentence summary that makes me want to watch"
}
```

### Change Email Format

Edit `src/index.js` to customize the email subject and body.

---

## 🐛 Common Issues & Solutions

| Problem                                      | Solution                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **"Missing required environment variables"** | Double-check your `.env` file has all 6 variables                                                |
| **Email not sending**                        | Verify you're using Gmail App Password (not regular password) and 2FA is enabled                 |
| **No videos detected**                       | Confirm Channel ID is correct - try the Channel ID Finder tool                                   |
| **"Quota exceeded" error**                   | You hit YouTube API daily limit (10,000 requests). Reduce check frequency or wait until tomorrow |
| **AI summary fails**                         | Check if you have OpenAI credits remaining at platform.openai.com                                |
| **Duplicate notifications**                  | Delete `notified.json` file to reset tracking                                                    |

---

## 📁 Project Structure

```
youtube-upload-notifier/
├── src/
│   ├── ai/              # OpenAI integration
│   │   └── summarize.js
│   ├── youtube/         # YouTube API
│   │   ├── fetch.js
│   │   └── index.js
│   ├── notify/          # Email sender
│   │   └── email.js
│   ├── storage/         # Track notified videos
│   │   └── store.js
│   ├── config/          # Environment setup
│   │   └── env.js
│   └── index.js         # Main application
├── .env                 # Your secrets (don't commit!)
├── notified.json        # Tracking file (auto-generated)
├── package.json
└── README.md
```

---

## 🎓 Learning Resources

New to these technologies? Here are great places to learn:

- **Node.js:** [nodejs.dev/learn](https://nodejs.dev/learn)
- **YouTube API:** [developers.google.com/youtube](https://developers.google.com/youtube/v3)
- **OpenAI API:** [platform.openai.com/docs](https://platform.openai.com/docs)
- **Railway Deployment:** [docs.railway.app](https://docs.railway.app)

---

## 🚀 Next Steps

Once you have this working, you can:

- [ ] Monitor multiple channels (modify the code to loop through an array)
- [ ] Add Discord/Telegram notifications instead of email
- [ ] Store data in a database (PostgreSQL/MongoDB)
- [ ] Create a web dashboard to manage channels
- [ ] Add filters (only notify for videos with certain keywords)
- [ ] Include video thumbnails in emails

---

## 💡 Pro Tips

1. **Test with your own channel first** - Upload a test video to verify everything works
2. **Monitor the logs** - Use `pm2 logs` or Railway logs to watch for issues
3. **Set up alerts** - Get notified if your service goes down (use uptimerobot.com)
4. **Backup your .env** - Store it securely in a password manager
5. **Rate limits** - YouTube API has daily quotas, don't check more than once per minute

---

## 🛡️ Security Best Practices

✅ **DO:**

- Use Gmail App Passwords (not your real password)
- Keep `.env` in `.gitignore`
- Rotate API keys if accidentally exposed
- Use environment variables on deployment platforms

❌ **DON'T:**

- Commit `.env` to GitHub
- Share your API keys publicly
- Use your real Gmail password
- Hard-code secrets in your code

---

## 📄 License

MIT License - Feel free to use this for personal or commercial projects!

---

## 🙋‍♂️ Need Help?

Stuck? Here's what to do:

1. Check the **Common Issues** section above
2. Review your `.env` file carefully
3. Check the logs for error messages
4. Search the error on Google/Stack Overflow

Remember: Every developer gets stuck sometimes. That's how we learn! 💪

---

**Built with ❤️ using Node.js & AI**

⭐ If this project helped you, give it a star on GitHub!
