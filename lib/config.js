const fs = require('fs')

global.owner = "234" //owner number
global.footer = "TENNET-MD" //footer section
global.status = false //"self/public" section of the bot
global.owner = ['2348124269148']
global.xprefix = '.'
global.gambar = "https://www.tennetteam.com/assets/images/slider/Brand%20icon.png"
global.OWNER_NAME = "@drainer_lord" //
global.DEVELOPER = ["2348124269148"] //
global.BOT_NAME = "TENNET-MD"
global.bankowner = "TENNET-MD"
global.creatorName = "TENNET-MD"
global.ownernumber = '2348124269148'  //creator number
global.location = "Nigeria, Delta-state, ilese"
global.prefa = ['','!','.','#','&']
//================DO NOT CHANGE OR YOU'LL GET AN ERROR=============\
global.footer = "TENNET-MD" //footer section
global.link = "https://whatsapp.com/channel/0029VbBBlBZ5PO13rTZcKk14"
global.autobio = true//auto update bio
global.botName = "TENNET-MD"
global.version = "1.0.1"
global.botname = "TENNET-MD"
global.author = "TENNET-MD"
global.themeemoji = ''
global.wagc = 'https://chat.whatsapp.com/F5tRABjVmhvGLGww7Gk0aV'
global.thumbnail = 'https://www.tennetteam.com/assets/images/slider/Brand%20icon.png'
global.richpp = ' '
global.packname = "Sticker By TENNET-MD"
global.author = "\n\n\n\n\nCreate by TENNET-MD\ntelegram : @drainer_lord"
global.creator = "2348124269148@s.whatsapp.net"
global.ownername = 'TENNET-MD' 
global.onlyowner = `𝘴𝘰𝘳𝘳𝘺 𝘰𝘯𝘭𝘺 𝘧𝘰𝘳  𝘰𝘸𝘯𝘦𝘳𝘴
𝘤𝘰𝘯𝘵𝘢𝘤𝘵 TENNET-MD 𝘵𝘰 𝘣𝘦 𝘢𝘯 𝘰𝘸𝘯𝘦𝘳`
  // reply 
global.database = `𝘛𝘰 𝘣𝘦 𝘪𝘯  𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦 𝘣𝘢𝘴𝘦 𝘤𝘰𝘯𝘵𝘢𝘤𝘵 TENNET-MD*`
  global.mess = {
wait: "```WAIT FOR TENNET-MD``",
   success: "𝑺𝒖𝒄𝒄𝒆𝒔𝒔 for BigTennet",
   on: "TENNET-MD active bro", 
   prem: "FOR PREMIUM USERS ONLY ADD YOUR NUMBER TO DATABASE TO ACCESS PREMIUM", 
   off: "TENNET-MD off",
   query: {
       text: "Where's the text, man?",
       link: "Where's the link, bro?",
   },
   error: {
       fitur: "Sorry, bro, the feature has error. Please chat with the Bot Developer so it can be fixed immediately.",
   },
   only: {
       group: "Sorry bro, This Feature Can Only Be Used In Groups only",
private: "Sorry bro, This Feature Can Only Be Used In Private Chats",
       owner: "Sorry bro, This Feature Can Only Be Used by Richie",
       admin: " Sorry, this feature can only be used by Bot Admins",
       badmin: "Sorry, bro, It Looks Like You Can't Use This Feature Because the Bot is Not yet Group Admin",
       premium: "This feature is specifically for Richie beloved Premium users",
   }
}

global.hituet = 0

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
