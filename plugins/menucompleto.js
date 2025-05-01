const handler = async (m, { conn, usedPrefix, command, args, text }) => {
  let user = global.db.data.users[m.sender]
  let username = await conn.getName(m.sender)
  let totalComandos = Object.values(global.plugins).filter(v => v?.help).map(v => v.help).flat().length || 0

  let menu = `
*¡Hola!* *${username}*

╭━〔 𝗟𝗨𝗡𝗔𝗕𝗢𝗧 - 𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 〕━⬣
┃ *Versión:* 10
┃ *Comandos:* ${totalComandos}
┃ *Diamantes:* ${user.diamantes || 0}
┃ *LunaCoins:* ${user.lunacoins || 0}
┃ *Experiencia:* ${user.exp || 0}
┃ *Nivel:* ${user.level || 0}
┃ *Rango:* ${user.role || 'Sin rango'}
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 ✨ INFORMACIÓN ✨ 〕━⬣
┃➺ .estado
┃➺ .infobot
┃➺ .velocidad
┃➺ .donar
┃➺ .grupos
┃➺ .terminosycondiciones
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 📁 DESCARGAS 📁 〕━⬣
┃➺ .play
┃➺ .ytmp3
┃➺ .ytmp4
┃➺ .tiktok
┃➺ .mediafire
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 🔞 MENÚ +18 🔞 〕━⬣
┃➺ .pack
┃➺ .videoxxx
┃➺ .pornhubdl
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 🛠️ HERRAMIENTAS 🛠️ 〕━⬣
┃➺ .calc
┃➺ .traducir
┃➺ .encuesta
┃➺ .acortar
┃➺ .qrcode
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 🔍 BÚSQUEDA 🔍 〕━⬣
┃➺ .imagen
┃➺ .clima
┃➺ .letra
┃➺ .wikipedia
┃➺ .apk
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 🖼️ STICKERS 🖼️ 〕━⬣
┃➺ .sticker
┃➺ .emojimix
┃➺ .attp
┃➺ .toimg
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 🧪 CONVERTIDORES 🧪 〕━⬣
┃➺ .toaudio
┃➺ .tomp3
┃➺ .toptt
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 ⚙️ GRUPOS ⚙️ 〕━⬣
┃➺ .link
┃➺ .promote
┃➺ .demote
┃➺ .setwelcome
┃➺ .group abrir/cerrar
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 ⚗️ RPG ⚗️ 〕━⬣
┃➺ .cazar
┃➺ .trabajar
┃➺ .banco
┃➺ .robar
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 🎮 JUEGOS 🎮 〕━⬣
┃➺ .ppt
┃➺ .fake
┃➺ .formarpareja
┃➺ .reto
┃➺ .pregunta
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 🎧 MODIFICADOR DE AUDIO 🎧 〕━⬣
┃➺ .bass
┃➺ .blown
┃➺ .deep
┃➺ .fast
┃➺ .slow
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━〔 👑 OWNER 👑 〕━⬣
┃➺ .cajafuerte
┃➺ .reiniciar
┃➺ .actualizar
┃➺ .banchat
┃➺ .addprem
╰━━━━━━━━━━━━━━━━━━━━⬣

LunaBot siempre contigo. Usa *${usedPrefix}menu* para ver las secciones.
`.trim()

  await conn.sendFile(m.chat, 'https://telegra.ph/file/123456789abcdef.jpg', 'menulunabot.jpg', menu, m)
}

handler.help = ['menucompleto', 'allmenu']
handler.tags = ['main']
handler.command = /^(menucompleto|allmenu)$/i

export default handler
