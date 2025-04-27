import fs from 'fs'
let handler = async (m, { conn }) => {
  let txt = `
╭━━〔 *${global.botname}* 〕━━⬣
┃💌 ¡Hola! soy ${global.botname}
┃🌟 Aquí tienes el menú de comandos:
┃
┃➤ !menu
┃➤ !ping
┃➤ !play [nombre canción]
┃➤ !sticker
┃➤ !welcome
┃➤ !antilink
┃
┃🎀 ¡Y muchos más!
╰━━━━━━〔 LunaBot 〕━━━━⬣
`.trim()

  await conn.reply(m.chat, txt, m)
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^menu$/i

export default handler
