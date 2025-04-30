const handler = async (m, { conn, command, usedPrefix, isOwner, isAdmin }) => {
  if (!isOwner && !isAdmin) return m.reply('❌ Este menú es exclusivo para administradores y el propietario.')

  const texto = `
╭───────[ *🔞 MENÚ +18* ]───────◆
│ *Bot:* LunaBot Oficial
│ *Creador:* Tilin Ventas
│ *Grupo:* Solo con autorización
│ *Versión:* 1.0
╰────────────────────────────◆

▢ *Contenido NSFW disponible:*

🫦 ${usedPrefix}pack
🩲 ${usedPrefix}panties
🍑 ${usedPrefix}ass
🍒 ${usedPrefix}boobs
👅 ${usedPrefix}ahegao
🍆 ${usedPrefix}porno
🖤 ${usedPrefix}hentai
💥 ${usedPrefix}rule34
⚣ ${usedPrefix}yaoi
⚤ ${usedPrefix}ecchi
🧃 ${usedPrefix}trap

*Utiliza estos comandos bajo tu propia responsabilidad.*
`.trim()

  await conn.sendMessage(m.chat, {
    text: texto,
    contextInfo: {
      externalAdReply: {
        title: 'Contenido NSFW disponible',
        body: 'LunaBot Oficial - Tilin Ventas',
        thumbnailUrl: 'https://i.imgur.com/3pNoakS.jpg', // puedes cambiar la imagen
        sourceUrl: 'https://whatsapp.com/channel/0029VauK3kA4SpkPQyez1z00', // canal o red social
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  }, { quoted: m })
}

handler.help = ['menu18', '+18', 'menunsfw']
handler.tags = ['menu', 'nsfw']
handler.command = /^(\+18|menu18|menunsfw)$/i

export default handler
