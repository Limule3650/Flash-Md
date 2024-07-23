const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU05SQjZjQzUrZDhZTEI2UHNpRU1OQTFpOC80dFBSb0V0RjRGbVVPQjQyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDdMcWJ5K2MrRVpqUytFM0FaTnVsZ3h1b2dyaXBoNnVSNnRBNjFmS21CRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRXVhZ3BzYVhnUHNTU1lEQlNkQ0VNMEhHci9iUmJLbm4zQzFYVU5qS200PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzdHpuN011YUdIc3NlcEUxLzlHSHJ6QnE3ZUcyOFdydXVUTFBkUkpSRmpJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitIcHBsLzBvOGg2bFJuRGtXL2d2b0pwcExyOHVWN2xXelJXd0ZJMVBlSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZxTWo1REdYTlBqdVlydyt0ek91UUtublpKRGYzOEpZM1RuUVloeDFVZ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VGUTZRSVpmWndhWDhhcEM1dU5BVG0wbFY1RzdheHh5aHI2b2ROWk5FYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczhjWURkUE9RT2I3VERKZ0dyOWwxdVJyR1hLK1Rmb0JXMlZkM0tzemhtbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRkL1JHNU9LWnJSTlV1OWZMRFp2ZjhocXcwZFpwcnFmR05FN2o0TTA4ZkxiZWI4TVpVMWxxbHpsQlljS0Y2TlZDeS9BQ2QwQ0NmRldxem43dG9WN0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiJBNUJuUlJMQzhHbVRDRVBLL1BOcW9oRVBwU1gxb1c5KzUwMm1iRWFwamVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI0MjA1MDU5NjgwMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTU5NzZCRUE1M0M2N0Y4NUREOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxNzQxMTI0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3RDFPaDNNYVFVLVN4bUZiVm53c3BnIiwicGhvbmVJZCI6IjI2ODZiYjFhLWIxZjktNDY4Yy1iOGQzLTgwMTAzOTc4ZDZmOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiY1VDcWZqQll0b2Y1UG05NGpRMFI1aHFwK3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWNxMkxkb1czQUxhYWZmOVQ0cU1uK0c3cDVBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjJEQUJYVzhEIiwibWUiOnsiaWQiOiIyNDIwNTA1OTY4MDE6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwlqOUIPCdmbbwnZm+8J2ag/CdmbDwnZqBIPCdmbDwnZm6LTQ3IPCWo5QifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xQT3d1SUlFTFBlL3JRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZHQ2w0N3BnOEMyeEJuOGdSZDhRbTFtQTc0a284S0tuWlVGOEhmbVFvbXM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkZUV1pnM2p6cDV4aytKRTNKWmhKRTZXekFiOHUzbTMxL2E3eHFiRDNGK25Wem8reERLbGZybklKQy9manR6eE9VSlpNYnpSZEpXKzB3MmhJV3Q5S2d3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1Y0VDWjM3ODU3MnVFZUZqOStXYVh5K2JkVXNhY1I1ZXVMZzJtdFlRRmxmMHBibU4rdE81b05JODBjTnJFeTgyZ1VpYmdEZk1lcE5lRm1FZC9udDZEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0MjA1MDU5NjgwMToxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJ4Z3BlTzZZUEF0c1FaL0lFWGZFSnRaZ08rSktQQ2lwMlZCZkIzNWtLSnIifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE3NDExMTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSG1TIn0=',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "𖣔 𝙶𝙾𝚃𝙰𝚁 𝙰𝙺-47 𖣔",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "237693538738", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || '𖣔 𝙶𝙾𝚃𝙰𝚁 𝙰𝙺-47',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
