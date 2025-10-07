# 🤖 TENNET-MD WhatsApp Bot

A powerful, feature-rich WhatsApp bot built with Node.js and Baileys. This bot provides a comprehensive set of features including entertainment, utilities, and automation tools.

## ✨ Features

- 🎮 **Entertainment Commands**: Jokes, facts, truth or dare, and more
- 🛠️ **Utility Functions**: Image generation, text-to-speech, file conversion
- 📱 **Multi-device Support**: Works with WhatsApp Web API
- 🎨 **Custom Branding**: Fully branded with TENNET-MD identity
- 🔒 **Secure**: Uses WhatsApp's official pairing system
- 📊 **Analytics**: Built-in usage tracking and statistics

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- A WhatsApp account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bigtennet/TENNET-MD.git
   cd TENNET-MD
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the bot**
   ```bash
   npm start
   ```

4. **Pair your WhatsApp**
   - Open your browser and go to `http://localhost:2004/pair`
   - Enter your WhatsApp number (without +)
   - Click "Pair" and use the generated code in WhatsApp

## 📋 Available Commands

### Basic Commands
- `.menu` - Show bot menu
- `.ping` - Test bot speed
- `.runtime` - Check bot uptime
- `.owner` - Get owner contact

### Entertainment
- `.joke` - Get a random joke
- `.fact` - Get a random fact
- `.truth` - Get a truth question
- `.dare` - Get a dare challenge

### Utilities
- `.say <text>` - Text to speech
- `.gfx <text1> | <text2>` - Generate graphics
- `.shorturl <link>` - Shorten URLs
- `.tourl <text>` - Convert text to URL

## 🔧 Configuration

The bot configuration is located in `lib/config.js`. You can customize:

- Bot name and branding
- Owner information
- Social media links
- Feature toggles

## 📱 Social Links

- **Telegram**: [@drainer_lord](https://t.me/drainer_lord)
- **Channel**: [@tennetmdbot](https://t.me/tennetmdbot)
- **YouTube**: [@tennetmdbot](https://youtube.com/@tennetmdbot)
- **WhatsApp Group**: [Join Group](https://chat.whatsapp.com/F5tRABjVmhvGLGww7Gk0aV)
- **WhatsApp Channel**: [Join Channel](https://whatsapp.com/channel/0029VbBBlBZ5PO13rTZcKk14)

## 🛠️ Development

### Project Structure
```
TENNET-MD/
├── lib/
│   ├── config.js          # Bot configuration
│   ├── pairing.json       # Pairing settings
│   └── utils.js           # Utility functions
├── case.js                # Command handlers
├── pair.js                # WhatsApp pairing logic
├── pair.html              # Pairing interface
├── index.js               # Main server file
└── package.json           # Dependencies
```

### Adding New Commands

1. Open `case.js`
2. Add your command in the switch statement
3. Follow the existing pattern for command structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**TENNET-MD**
- Telegram: [@drainer_lord](https://t.me/drainer_lord)
- Phone: +2348124269148

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Disclaimer

This bot is for educational purposes only. Please use it responsibly and in accordance with WhatsApp's Terms of Service.

## 📞 Support

If you encounter any issues or have questions:

- Create an issue on GitHub
- Contact via Telegram: [@drainer_lord](https://t.me/drainer_lord)
- Join our WhatsApp group for support

---

**Made with ❤️ by TENNET-MD**
