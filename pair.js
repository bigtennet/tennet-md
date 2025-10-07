const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const axios = require("axios");
const { exec } = require("child_process");
const {
  Boom
} = require('@hapi/boom');
const chalk = require("chalk");
const FileType = require("file-type");
const readline = require('readline');
const { writeFileSync } = require("fs");
const path = require("path");
const {
  default: makeWASocket,
  jidDecode,
  DisconnectReason,
  PHONENUMBER_MCC,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  Browsers,
  getContentType,
  proto,
  downloadContentFromMessage,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  makeInMemoryStore
} = require("@whiskeysockets/baileys");
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const {
  writeExif,
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require('./lib/exif');
const {
  sleep,
  getSizeMedia,
  getBuffer
} = require('./lib/utils');
const {
  getSetting,
  setSetting
} = require("./lib/Settingsdb.js");
let store = { chats: {}, messages: {} };

 // simple placeholder instead of store
/*let store = makeInMemoryStore({
  logger: pino().child({
    level: 'silent',
    stream: 'store'
  })
});*/

const retryMap440 = {};
function removeFile(FilePath) {
  if (!fs.existsSync(FilePath)) {
    return false;
  }
  fs.rmSync(FilePath, {
    recursive: true,
    force: true
  });
}
;
async function TAIRA_TECH_CODE(user, res) {
  const {
    state,
    saveCreds
  } = await useMultiFileAuthState('./lib/paired-users/' + user);
  try {
    let TAIRA_TECH_SESSION = makeWASocket({
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({
          level: "fatal"
        }).child({
          level: "fatal"
        }))
      },
      printQRInTerminal: false,
      logger: pino({
        level: "silent"
      }).child({
        level: "silent"
      }),
      version: [2, 3000, 1023223821],
      browser: Browsers.ubuntu("Edge"),
      connectTimeoutMs: 60000,
      keepAliveIntervalMs: 30000,
      retryRequestDelayMs: 250,
      maxMsgRetryCount: 5,
      defaultQueryTimeoutMs: 60000,
      generateHighQualityLinkPreview: true
    });
    if (res && !TAIRA_TECH_SESSION.authState.creds.registered) {
      await delay(1500);
      let code = await TAIRA_TECH_SESSION.requestPairingCode(user);
      code = code?.match(/.{1,4}/g)?.join("-") || code;
      console.log(`TENNET-MD Bot - Pairing Code: ${code}`);
      await res.send({
        code
      });
    }
    TAIRA_TECH_SESSION.ev.on('creds.update', saveCreds);
    TAIRA_TECH_SESSION.newsletterMsg = async (key, content = {}, timeout = 5000) => {
      const {
        type: rawType = 'INFO',
        name,
        description = '',
        picture = null,
        react,
        id,
        newsletter_id = key,
        ...media
      } = content;
      const type = rawType.toUpperCase();
      if (react) {
        if (!(newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id))) {
          throw [{
            message: 'Use Id Newsletter',
            extensions: {
              error_code: 204,
              severity: 'CRITICAL',
              is_retryable: false
            }
          }];
        }
        if (!id) {
          throw [{
            message: 'Use Id Newsletter Message',
            extensions: {
              error_code: 204,
              severity: 'CRITICAL',
              is_retryable: false
            }
          }];
        }
        const hasil = await TAIRA_TECH_SESSION.query({
          tag: 'message',
          attrs: {
            to: key,
            type: 'reaction',
            'server_id': id,
            id: generateMessageID()
          },
          content: [{
            tag: 'reaction',
            attrs: {
              code: react
            }
          }]
        });
        return hasil;
      } else if (media && typeof media === 'object' && Object.keys(media).length > 0) {
        const msg = await generateWAMessageContent(media, {
          upload: TAIRA_TECH_SESSION.waUploadToServer
        });
        const anu = await TAIRA_TECH_SESSION.query({
          tag: 'message',
          attrs: {
            to: newsletter_id,
            type: 'text' in media ? 'text' : 'media'
          },
          content: [{
            tag: 'plaintext',
            attrs: /image|video|audio|sticker|poll/.test(Object.keys(media).join('|')) ? {
              mediatype: Object.keys(media).find(key => ['image', 'video', 'audio', 'sticker', 'poll'].includes(key)) || null
            } : {},
            content: proto.Message.encode(msg).finish()
          }]
        });
        return anu;
      } else {
        if (/(FOLLOW|UNFOLLOW|DELETE)/.test(type) && !(newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id))) {
          return [{
            message: 'Use Id Newsletter',
            extensions: {
              error_code: 204,
              severity: 'CRITICAL',
              is_retryable: false
            }
          }];
        }
        const _query = await TAIRA_TECH_SESSION.query({
          tag: 'iq',
          attrs: {
            to: 's.whatsapp.net',
            type: 'get',
            xmlns: 'w:mex'
          },
          content: [{
            tag: 'query',
            attrs: {
              query_id: type == 'FOLLOW' ? '9926858900719341' : type == 'UNFOLLOW' ? '7238632346214362' : type == 'CREATE' ? '6234210096708695' : type == 'DELETE' ? '8316537688363079' : '6563316087068696'
            },
            content: new TextEncoder().encode(JSON.stringify({
              variables: /(FOLLOW|UNFOLLOW|DELETE)/.test(type) ? {
                newsletter_id
              } : type == 'CREATE' ? {
                newsletter_input: {
                  name,
                  description,
                  picture
                }
              } : {
                fetch_creation_time: true,
                fetch_full_image: true,
                fetch_viewer_metadata: false,
                input: {
                  key,
                  type: newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id) ? 'JID' : 'INVITE'
                }
              }
            }))
          }]
        }, timeout);
        const res = JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_join_v2 || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_leave_v2 || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_create || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_delete_v2 || JSON.parse(_query.content[0].content)?.errors || JSON.parse(_query.content[0].content);
        if (res.thread_metadata) {
          res.thread_metadata.host = 'https://mmg.whatsapp.net';
        } else {
          null;
        }
        return res;
      }
    };
    TAIRA_TECH_SESSION.decodeJid = jid => {
      if (!jid) {
        return jid;
      }
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return decode.user && decode.server && `${decode.user}@${decode.server}` || jid;
      } else {
        return jid;
      }
    };
TAIRA_TECH_SESSION.ev.on('messages.upsert', async chatUpdate => {
  try {
    const mess = chatUpdate.messages[0];
    if (!mess.message) return;

    // unwrap ephemeral
    mess.message = Object.keys(mess.message)[0] === 'ephemeralMessage'
      ? mess.message.ephemeralMessage.message
      : mess.message;

    const text = mess.message.conversation || '';
    const isModeCommand = text.startsWith('.self') || text.startsWith('.public');

    const senderJid = TAIRA_TECH_SESSION.decodeJid(
      mess.key?.participant ||
      (mess.key?.fromMe ? TAIRA_TECH_SESSION.user.id : mess.key?.remoteJid)
    );

    const ownerJid = TAIRA_TECH_SESSION.decodeJid(TAIRA_TECH_SESSION.user.id);

    // <-- CORRECT: per-owner bot mode
    const botMode = getSetting(ownerJid, "bot", "mode", "public");
    TAIRA_TECH_SESSION.public = botMode === "public";

    // If in self mode, ignore commands from others (but still allow mode switching)
    if (botMode === "self" && senderJid !== ownerJid && !isModeCommand) {
      return;
    }

    // Example: anti view status flag stored per-owner under bot scope
    const antiswview = getSetting(ownerJid, "bot", "antiswview", false);
    if (antiswview && mess.key?.remoteJid === 'status@broadcast') {
      await TAIRA_TECH_SESSION.readMessages([mess.key]);
    }

    if (!TAIRA_TECH_SESSION.public && !mess.key.fromMe && chatUpdate.type === 'notify') {
      return;
    }

    if (mess.key.id && mess.key.id.startsWith('BAE5') && mess.key.id.length === 16) {
      return;
    }

    const messg = smsg(TAIRA_TECH_SESSION, mess, store);
    require("./case")(TAIRA_TECH_SESSION, messg, chatUpdate, store);

  } catch (err) {
    console.log(err);
  }
});
// 🔹 Auto Read
TAIRA_TECH_SESSION.ev.on("messages.upsert", async (m) => {
    const { messages } = m;
    const ms = messages[0];
    if (!ms.message) return;

    const ownerJid = TAIRA_TECH_SESSION.decodeJid(TAIRA_TECH_SESSION.user.id);

    // 🔥 Only run if AutoRead is enabled globally
    if (!getSetting(ownerJid, "bot", "autoRead", false)) return;

    try {
        await TAIRA_TECH_SESSION.readMessages([{ 
            remoteJid: ms.key.remoteJid, 
            id: ms.key.id, 
            participant: ms.key.participant 
        }]);
    } catch (e) {
        console.error("❌ AutoRead Error:", e);
    }
});


    TAIRA_TECH_SESSION.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options);
      } else {
        buffer = await imageToWebp(buff);
      }
      await TAIRA_TECH_SESSION.sendMessage(jid, {
        sticker: {
          url: buffer
        },
        ...options
      }, {
        quoted
      }).then(response => {
        fs.unlinkSync(buffer);
        return response;
      });
    };

    //=========================================\\
    TAIRA_TECH_SESSION.sendText = (jid, text, quoted = '', options) => TAIRA_TECH_SESSION.sendMessage(jid, {
      text: text,
      ...options
    }, {
      quoted
    });
    //=========================================\\
    TAIRA_TECH_SESSION.getFile = async (PATH, save) => {
      let res;
      let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0);
      let type = (await FileType.fromBuffer(data)) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      };
      filename = path.join(__filename, '../src/' + new Date() * 1 + '.' + type.ext);
      if (data && save) {
        fs.promises.writeFile(filename, data);
      }
      return {
        res,
        filename,
        size: await getSizeMedia(data),
        ...type,
        data
      };
    };
    TAIRA_TECH_SESSION.ments = (teks = "") => {
      return teks.match("@") ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + "@s.whatsapp.net") : [];
    };
    TAIRA_TECH_SESSION.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
      let type = await TAIRA_TECH_SESSION.getFile(path, true);
      let {
        res,
        data: file,
        filename: pathFile
      } = type;
      if (res && res.status !== 200 || file.length <= 65536) {
        try {
          throw {
            json: JSON.parse(file.toString())
          };
        } catch (e) {
          if (e.json) {
            throw e.json;
          }
        }
      }
      let opt = {
        filename
      };
      if (quoted) {
        opt.quoted = quoted;
      }
      if (!type) {
        options.asDocument = true;
      }
      let mtype = '';
      let mimetype = type.mime;
      let convert;
      if (/webp/.test(type.mime) || /image/.test(type.mime) && options.asSticker) {
        mtype = 'sticker';
      } else if (/image/.test(type.mime) || /webp/.test(type.mime) && options.asImage) {
        mtype = 'image';
      } else if (/video/.test(type.mime)) {
        mtype = 'video';
      } else if (/audio/.test(type.mime)) {
        convert = await (ptt ? toPTT : toAudio)(file, type.ext);
        file = convert.data;
        pathFile = convert.filename;
        mtype = 'audio';
        mimetype = 'audio/ogg; codecs=opus';
      } else {
        mtype = 'document';
      }
      if (options.asDocument) {
        mtype = 'document';
      }
      delete options.asSticker;
      delete options.asLocation;
      delete options.asVideo;
      delete options.asDocument;
      delete options.asImage;
      let message = {
        ...options,
        caption,
        ptt,
        [mtype]: {
          url: pathFile
        },
        mimetype
      };
      let m;
      try {
        m = await TAIRA_TECH_SESSION.sendMessage(jid, message, {
          ...opt,
          ...options
        });
      } catch (e) {
        m = null;
      } finally {
        if (!m) {
          m = await TAIRA_TECH_SESSION.sendMessage(jid, {
            ...message,
            [mtype]: file
          }, {
            ...opt,
            ...options
          });
        }
        file = null;
        return m;
      }
    };
    TAIRA_TECH_SESSION.sendTextWithMentions = async (jid, text, quoted, options = {}) => TAIRA_TECH_SESSION.sendMessage(jid, {
      text: text,
      mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
      ...options
    }, {
      quoted
    });
    //=========================================\\
    const getBuffer = async (media) => {
  if (Buffer.isBuffer(media)) {
    return media;
  } else if (/^data:.*?\/.*?;base64,/i.test(media)) {
    return Buffer.from(media.split(`,`)[1], "base64");
  } else if (/^https?:\/\//.test(media)) {
    const res = await axios.get(media, { responseType: "arraybuffer" });
    return Buffer.from(res.data, "binary");
  } else {
    return fs.readFileSync(media);
  }
};

// 🔹 Ensure sticker folder exists
const ensureStickerDir = () => {
  const stickerDir = path.join(__dirname, "sticker");
  if (!fs.existsSync(stickerDir)) {
    fs.mkdirSync(stickerDir, { recursive: true });
  }
  return stickerDir;
};

// 🖼️ Image → Sticker
TAIRA_TECH_SESSION.sendImageAsSticker = async (jid, media, quoted, options = {}) => {
  let buffer = await getBuffer(media);
  const stickerDir = ensureStickerDir();

  let inputPath = path.join(stickerDir, "input.png");
  let outputPath = path.join(stickerDir, "output.webp");
  fs.writeFileSync(inputPath, buffer);

  await new Promise((resolve, reject) => {
    exec(
      `ffmpeg -y -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:-1:-1:color=white@0" -c:v libwebp -lossless 1 -preset default -an -vsync 0 "${outputPath}"`,
      (err) => (err ? reject(err) : resolve())
    );
  });

  await TAIRA_TECH_SESSION.sendMessage(
    jid,
    { sticker: { url: outputPath }, ...options },
    { quoted }
  );

  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);

  return outputPath;
};

// 🎥 Video/GIF → Animated Sticker
TAIRA_TECH_SESSION.sendVideoAsSticker = async (jid, media, quoted, options = {}) => {
  let buffer = await getBuffer(media);
  const stickerDir = ensureStickerDir();

  let inputPath = path.join(stickerDir, "input.mp4"); // also works for .gif
  let outputPath = path.join(stickerDir, "output.webp");
  fs.writeFileSync(inputPath, buffer);

  await new Promise((resolve, reject) => {
    exec(
      `ffmpeg -y -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=white@0" -c:v libwebp -preset default -an -vsync 0 "${outputPath}"`,
      (err) => (err ? reject(err) : resolve())
    );
  });

  await TAIRA_TECH_SESSION.sendMessage(
    jid,
    { sticker: { url: outputPath }, ...options },
    { quoted }
  );

  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);

  return outputPath;
};

TAIRA_TECH_SESSION.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
  let quoted = message.msg ? message.msg : message;
  let mime = (message.msg || message).mimetype || '';
  let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];

  const stream = await downloadContentFromMessage(quoted, messageType);
  let buffer = Buffer.from([]);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  let type = await FileType.fromBuffer(buffer);
  if (!type) throw new Error("❌ Could not detect file type");

  // ✅ Ensure folder exists
  if (!fs.existsSync("./sticker")) {
    fs.mkdirSync("./sticker", { recursive: true });
  }

  let trueFileName = attachExtension 
    ? './sticker/' + filename + '.' + type.ext 
    : './sticker/' + filename;

  await fs.writeFileSync(trueFileName, buffer);
  return trueFileName;
};
    
    TAIRA_TECH_SESSION.downloadMediaMessage = async message => {
      let mime = (message.msg || message).mimetype || '';
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
      const stream = await downloadContentFromMessage(message, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      return buffer;
    };



   TAIRA_TECH_SESSION.ev.on("connection.update", async update => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        console.log(reason);
        if (reason === 440) {
          retryMap440[user] = (retryMap440[user] || 0) + 1;
          if (retryMap440[user] < 2) {
            console.warn(chalk.yellow(`Error 440 for ${user}. Retry ${retryMap440[user]} of ${2}...`));
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log(chalk.yellow(`Retrying pairing for ${user}...`));
            TAIRA_TECH_CODE(user, res);
          } else {
            console.error(chalk.red.bold(`Failed to reconnect ${user} after ${2} attempts. Giving up.`));
          }
        } else if (reason === DisconnectReason.badSession) {
          console.log("Invalid Session File, Please Delete Session Ask Owner For Connection");
        } else if (reason === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
          TAIRA_TECH_CODE(user, res);
        } else if (reason === DisconnectReason.connectionLost) {
          console.log("Server Connection Lost, Reconnecting...");
          TAIRA_TECH_CODE(user, res);
        } else if (reason === DisconnectReason.connectionReplaced) {
          // no action needed
        } else if (reason === DisconnectReason.loggedOut) {
          removeFile(`./lib/paired-users/${user}`);
          console.log(chalk.bgRed(`${user} disconnected from using rentbot`));
        } else if (reason === DisconnectReason.restartRequired) {
          TAIRA_TECH_CODE(user, res);
        } else if (reason === DisconnectReason.timedOut) {
          TAIRA_TECH_CODE(num);
        } else if (reason === '405') {
          console.log("error 405 detected raising new pairing");
          await TAIRA_TECH_CODE(user, res);
        } else {
          console.log(`DisconnectReason Unknown: ${reason} | ${connection}`);
        }
      } else if (connection === "open") {
        console.log(chalk.bgBlue(`TENNET-MD is active in ${user}`));
         console.log(chalk.green.bold("online."));
        console.log(chalk.cyan("< ====================[ TENNET-MD ]========================= >"));
        console.log(chalk.magenta(`${"❣️"} TENNET-MD \n`));
      }
    });
  } catch (err) {
    if (!res.headersSent) {
      await res.send({ code: "Service Unavailable" });
    }
  }
}

router.get('/', async (req, res) => {
  let num = req.query.number;
  console.log("Request received");
  return await TAIRA_TECH_CODE(num, res);
});
module.exports = router;
module.exports.TAIRA_TECH_CODE = TAIRA_TECH_CODE;

function smsg(conn, m, store) {
  if (!m) return m;
  let M = proto.WebMessageInfo;

  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith('@g.us');
    m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '');
    if (m.isGroup) {
      m.participant = conn.decodeJid(m.key.participant) || '';
    }
  }

  if (m.message) {
    m.mtype = getContentType(m.message);
    m.msg = m.mtype == 'viewOnceMessage'
      ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
      : m.message[m.mtype];

    m.body = m.message.conversation
      || m.msg.caption
      || m.msg.text
      || (m.mtype == 'listResponseMessage' && m.msg.singleSelectReply.selectedRowId)
      || (m.mtype == 'buttonsResponseMessage' && m.msg.selectedButtonId)
      || (m.mtype == 'viewOnceMessage' && m.msg.caption)
      || m.text;

    let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];

    if (m.quoted) {
      let type = getContentType(quoted);
      m.quoted = m.quoted[type];
      if (['productMessage'].includes(type)) {
        type = getContentType(m.quoted);
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === 'string') {
        m.quoted = { text: m.quoted };
      }

      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false;
      m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id);
      m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
      m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];

      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };

      // FIXED HERE
      let vM = m.quoted.fakeObj = proto.WebMessageInfo.create({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {})
      });

      m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key });
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options);
      m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
    }
  }

  if (m.msg && m.msg.url) {
    m.download = () => conn.downloadMediaMessage(m.msg);
  }

  m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || '';

  m.reply = (text, chatId = m.chat, options = {}) =>
    Buffer.isBuffer(text)
      ? conn.sendMedia(chatId, text, 'file', '', m, { ...options })
      : conn.sendText(chatId, text, m, { ...options });

  // FIXED HERE TOO
  m.copy = () => exports.smsg(conn, proto.WebMessageInfo.create(proto.WebMessageInfo.toObject(m)));
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options);

  return m;
}