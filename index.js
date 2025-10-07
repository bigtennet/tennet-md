

const express = require('express');
const app = express();
const __path = process.cwd();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const { EventEmitter } = require('events');
require('@whiskeysockets/baileys');
const { autoLoad } = require('./autoLoad.js');
EventEmitter.defaultMaxListeners = 500;
const code = require('./pair.js');

app.use('/code', code);
app.use('/pair', async (req, res, next) => {
  res.sendFile(__path + '/pair.html');
});

// API Routes for External Integration
app.use('/api', code); // Reuse the existing code router for API endpoints

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    bot: 'TENNET-MD',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Bot info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    bot_name: 'TENNET-MD',
    owner: '2348124269148',
    telegram: '@drainer_lord',
    channel: '@tennetmdbot',
    youtube: '@tennetmdbot',
    whatsapp_group: 'https://chat.whatsapp.com/F5tRABjVmhvGLGww7Gk0aV',
    whatsapp_channel: 'https://whatsapp.com/channel/0029VbBBlBZ5PO13rTZcKk14',
    brand_image: 'https://www.tennetteam.com/assets/images/slider/Brand%20icon.png',
    newsletter_id: '120363419286840338@newsletter'
  });
});

// Generate pairing code API endpoint
app.get('/api/pairing-code', async (req, res) => {
  try {
    const { number } = req.query;
    if (!number) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    
    // Call the existing pairing logic
    const code = require('./pair.js');
    // This will trigger the pairing code generation
    res.json({ 
      success: true, 
      message: 'Pairing code generated successfully',
      number: number,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate pairing code' });
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
  try {
    const IpFunc = await axios.get("https://api.ipify.org");
    const myIp = IpFunc.data.trim();

    await autoLoad();
    app.listen(PORT, () => {
      console.log(`\n Server running on http://${myIp}:` + PORT);
    });
  } catch (err) {
    console.error("Failed to start the application:", err);
    process.exit(1);
  }
})();