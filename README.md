# 📚 Malayalam Books Library

A modern, beautiful web application for browsing and accessing Malayalam books stored in Supabase, with Telegram bot integration for file delivery.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **🎨 Modern UI**: Sleek dark theme with smooth animations and gradient accents
- **🔍 Smart Search**: Real-time search through book titles and descriptions
- **🎯 Quick Filters**: One-click filtering by file type (PDF, EPUB) and size
- **📊 Multiple Views**: Toggle between grid and list layouts
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast Performance**: Vanilla JavaScript with no framework overhead
- **📥 Telegram Integration**: Direct download links through Telegram bot
- **💾 Supabase Backend**: Reliable PostgreSQL database with REST API

## 🚀 Demo

[Live Demo](#) <!-- Add your live demo link here -->

## 📸 Screenshots

<!-- Add screenshots of your application -->

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL + REST API)
- **Bot**: Telegram Bot API
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Unicode Emoji

## 📋 Prerequisites

Before you begin, ensure you have:

- A Supabase account and project
- A Telegram bot (created via [@BotFather](https://t.me/botfather))
- A web server or hosting platform (GitHub Pages, Netlify, Vercel, etc.)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/malayalam-books-library.git
cd malayalam-books-library
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Create a table named `books` with the following schema:

```sql
CREATE TABLE books (
  _id TEXT PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  caption TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Get your project details:
   - Project Reference ID (from project URL)
   - Anon/Public API key (from Settings > API)

### 3. Set Up Telegram Bot

1. Create a bot using [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Set up your bot to handle file requests with the format: `filep_<book_id>`

### 4. Configure the Application

Open `index.html` and update the configuration section:

```javascript
const CONFIG = {
  PROJECT_REF: 'your-project-ref',           // Your Supabase project reference
  SUPABASE_KEY: 'your-anon-key',            // Your Supabase anon key
  TG_BOT: 'your-bot-username'               // Your Telegram bot username
};
```

### 5. Deploy

Deploy the `index.html` file to your preferred hosting platform:

#### GitHub Pages
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
Then enable GitHub Pages in repository Settings.

#### Netlify
```bash
netlify deploy --prod
```

#### Vercel
```bash
vercel --prod
```

## 📊 Database Schema

```sql
CREATE TABLE books (
  _id TEXT PRIMARY KEY,              -- Unique identifier
  file_name TEXT NOT NULL,           -- Book filename
  file_size BIGINT,                  -- File size in bytes
  mime_type TEXT,                    -- MIME type (e.g., application/pdf)
  caption TEXT,                      -- Book description
  created_at TIMESTAMP DEFAULT NOW() -- Creation timestamp
);

-- Indexes for better performance
CREATE INDEX idx_file_name ON books(file_name);
CREATE INDEX idx_mime_type ON books(mime_type);
CREATE INDEX idx_created_at ON books(created_at DESC);
```

## 🎯 Usage

### Adding Books to Database

You can add books to your Supabase database using:

1. **Supabase Dashboard**: Insert rows manually
2. **API**: Use Supabase REST API or client libraries
3. **Telegram Bot**: Set up your bot to automatically add files to the database

Example using JavaScript:

```javascript
const { data, error } = await supabase
  .from('books')
  .insert([
    {
      _id: 'unique-id',
      file_name: 'Malayalam Novel.pdf',
      file_size: 5242880,
      mime_type: 'application/pdf',
      caption: 'A classic Malayalam novel'
    }
  ]);
```

### User Features

- **Search**: Type in the search box to filter books by name or description
- **Filter**: Click filter chips to show specific file types or sizes
- **Sort**: Use the dropdown to sort by name or file size
- **View**: Toggle between grid and list views
- **Download**: Click "Get on Telegram" to download via your bot
- **Share**: Copy deep links to share specific books

## 🎨 Customization

### Change Colors

Edit the CSS variables in the `<style>` section:

```css
:root {
  --bg-primary: #0a0e16;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  /* Add more customizations */
}
```

### Modify Layout

Adjust grid columns in the CSS:

```css
.grid.grid-view {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}
```

### Add Features

The codebase is modular and easy to extend. Key functions:
- `loadBooks()`: Fetches data from Supabase
- `applyFilters()`: Handles search and filtering
- `renderBooks()`: Renders the book cards

## 🔒 Security Notes

- **API Keys**: The anon key is safe to expose in frontend code (it has Row Level Security)
- **RLS**: Consider enabling Row Level Security in Supabase for production
- **CORS**: Configure CORS settings in Supabase if needed
- **Bot Token**: Never expose your Telegram bot token in frontend code

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [Telegram](https://telegram.org) for the bot API
- [Google Fonts](https://fonts.google.com) for the Inter font
- The Malayalam reading community

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/malayalam-books-library](https://github.com/yourusername/malayalam-books-library)

## 🗺️ Roadmap

- [ ] Add user authentication
- [ ] Implement favorites/bookmarks
- [ ] Add reading progress tracking
- [ ] Support for more file formats
- [ ] Advanced search with filters
- [ ] Book categories and tags
- [ ] User reviews and ratings
- [ ] Dark/Light theme toggle

---

Made with ❤️ for the Malayalam reading community
