# 📚 eBooks Drive - Telegram Mini App

A powerful Telegram Mini App for searching and accessing 432,000+ eBooks. Built with Supabase backend and optimized for fast search performance.

## ✨ Features

- 🔍 **Fast Search** - Search through 432K+ books instantly
- 📱 **Telegram Integration** - Native Telegram Mini App experience
- 🎨 **Adaptive Themes** - Supports Telegram dark/light themes
- 📊 **Smart Sorting** - Sort by name, size, relevance
- 💾 **Supabase Backend** - Reliable and scalable database
- ⚡ **Optimized Performance** - Search-only approach for fast results
- 🎯 **Haptic Feedback** - Native mobile vibration feedback
- 👤 **User Info Display** - Shows Telegram user information

## 🚀 Live Demo

- **Web App**: [https://alifdrive.vercel.app](https://alifdrive.vercel.app)
- **Telegram Bot**: [@alifdrivebot](https://t.me/alifdrivebot)

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Integration**: Telegram Web App API

## 📦 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/adnanxpkd/malayalam-library.git
cd malayalam-library
git checkout telegram-web-app
```

### 2. Configure Supabase

Update the following in `index.html`:

```javascript
const PROJECT_REF = 'your-project-ref';
const SUPABASE_KEY = 'your-anon-key';
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use Vercel Dashboard:
1. Import repository
2. Deploy automatically

### 4. Setup Telegram Bot

Open [@BotFather](https://t.me/BotFather) and configure:

#### Create Web App
```
/newapp
Select your bot
Title: eBooks Drive
Description: Search and download 432,000+ eBooks
Photo: Upload 640x360 image
Web App URL: https://alifdrive.vercel.app
Short name: ebooksdrive
```

#### Set Menu Button
```
/setmenubutton
Select your bot
Button text: 📚 Search Books
Web App URL: https://alifdrive.vercel.app
```

#### Add Commands (Optional)
```
/setcommands
search - 📚 Search eBooks
help - ❓ Get help
```

## 🎯 How It Works

1. **Search-Only Architecture**: No initial data load - users search to get results
2. **Server-Side Filtering**: Supabase handles all search queries (case-insensitive)
3. **Limit 1000 Results**: Maximum 1000 books per search for performance
4. **Telegram Integration**: Uses official Telegram Web App SDK for native experience

## 📊 Database Schema

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  _id TEXT UNIQUE NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  caption TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast search
CREATE INDEX idx_books_file_name ON books USING gin(file_name gin_trgm_ops);
CREATE INDEX idx_books_caption ON books USING gin(caption gin_trgm_ops);
```

## 🔧 Configuration

### Environment Variables

For production, consider using environment variables:

```javascript
const CONFIG = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  BOT_USERNAME: process.env.BOT_USERNAME
};
```

### Telegram Bot Integration

Add inline keyboard in your bot code:

```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

keyboard = InlineKeyboardMarkup([[
    InlineKeyboardButton(
        "📚 Open eBooks Drive", 
        web_app=WebAppInfo(url="https://alifdrive.vercel.app")
    )
]])

await update.message.reply_text(
    "Search our massive collection!",
    reply_markup=keyboard
)
```

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `index.html`:

```css
:root { 
  --bg: #0b0f14; 
  --card: #121821; 
  --muted: #94a3b8; 
  --txt: #e5eefb; 
  --ring: #334155;
}
```

### Modify Search Limit

Change the search result limit:

```javascript
const url = `${BASE_URL}?or=(...search query...)&limit=1000`; // Change 1000
```

## 📱 Telegram Mini App Features

- ✅ Theme adaptation (dark/light mode)
- ✅ Haptic feedback on interactions
- ✅ MainButton integration
- ✅ User info display
- ✅ Closing confirmation
- ✅ Auto-expand to full height

## 🐛 Troubleshooting

### Search Not Working
- Check Supabase credentials
- Verify CORS settings in Supabase
- Check browser console for errors

### Telegram Integration Issues
- Ensure HTTPS (Vercel provides this)
- Verify bot token and Web App URL
- Test on actual Telegram app (not web)

### Slow Performance
- Check Supabase indexes
- Verify database region
- Consider implementing caching

## 📈 Performance Optimization

- **Search-only approach**: No heavy initial load
- **Client-side sorting**: After fetching results
- **Debounced search**: 300ms delay on typing
- **Lazy rendering**: Display results progressively
- **Optimized queries**: Indexed database columns

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Adnan**
- Telegram: [@adnanxpkd](https://t.me/adnanxpkd)
- GitHub: [@adnanxpkd](https://github.com/adnanxpkd)

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- Telegram for Mini App platform
- Vercel for hosting
- Inter font by Rasmus Andersson

## 📞 Support

For support and queries:
- Open an issue on GitHub
- Contact on Telegram: [@adnanxpkd](https://t.me/adnanxpkd)

---

Made with ❤️ by [adnanxpkd](https://t.me/adnanxpkd)
