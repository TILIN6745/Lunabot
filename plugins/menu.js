import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, command }) => {
  let { exp, level, role, diamond = 0, money = 0, token = 0 } = global.db.data.users[m.sender]
  let { min, xp, max } = xpRange(level, global.multiplier)
  let name = await conn.getName(m.sender)
  let date = new Date().toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  let totalComandos = Object.keys(global.plugins).length

  let menu = `
╭──〔 ✦ 𝐋𝐮𝐧𝐚𝐁𝐨𝐭 𝐌𝐄𝐍𝐔 ✦ 〕──╮
│  ʜᴏʟᴀ, *${name}*
│  🗓️ ${date}
│  🚀 𝐕𝐞𝐫𝐬𝐢𝐨́𝐧: 10.0
│  ⚙️ 𝐌𝐨𝐝𝐨: Público
│  🧩 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬: ${totalComandos}
╰────────────────────╯

✨ *𝐄𝐒𝐓𝐀𝐃𝐎 𝐃𝐄𝐋 𝐔𝐒𝐔𝐀𝐑𝐈𝐎* ✨
➺ Nivel: *${level}*
➺ Diamantes: *${diamond} 💎*
➺ LunaCoins: *${money} 🌙*
➺ Tokens: *${token} 🪙*

📂 *𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈́𝐀𝐒*:

┌──❖ 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 ❖
│ ⤷ ${usedPrefix}menucompleto
│ ⤷ ${usedPrefix}allmenu
└─────────────

┌──❖ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 ❖
│ ⤷ ${usedPrefix}descargasmenu
└─────────────

┌──❖ 𝐀𝐔𝐃𝐈𝐎𝐒 ❖
│ ⤷ ${usedPrefix}menuaudio
└─────────────

┌──❖ +𝟏𝟖 ❖
│ ⤷ ${usedPrefix}menu18
└─────────────

┌──❖ 𝐉𝐔𝐄𝐆𝐎𝐒 ❖
│ ⤷ ${usedPrefix}juegosmenu
└─────────────

┌──❖ 𝐆𝐑𝐔𝐏𝐎𝐒 ❖
│ ⤷ ${usedPrefix}grupomenu
└─────────────

┌──❖ 𝐏𝐑𝐎𝐏𝐈𝐄𝐓𝐀𝐑𝐈𝐎 ❖
│ ⤷ ${usedPrefix}ownermenu
└─────────────

🌙 𝐁𝐲 *LunaBot* | 𝐒𝐢𝐬𝐭𝐞𝐦𝐚 𝐆𝐚𝐥𝐚́𝐜𝐭𝐢𝐜𝐨
`.trim()

  conn.sendMessage(m.chat, { text: menu, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^menu|menuluna|m$/i
export default handler
