

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