const handler = async (m, { conn, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let nombre = await conn.getName(m.sender)

  let menuDescargas = `
*¡Hola ${nombre}!* Este es el menú de *descargas* de *LunaBot*.

╭━〔 🚀 DESCARGAS DISPONIBLES 🚀 〕━⬣
┃➤ *.play* (nombre o link) 
┃➤ *.playdoc* (MP3 en documento)
┃➤ *.ytmp3* (link YouTube)
┃➤ *.ytmp4* (link YouTube)
┃➤ *.ytmusica* (YouTube audio HD)
┃➤ *.ytvideo* (YouTube video HD)
┃➤ *.mediafire* (link directo)
┃➤ *.tiktok* (sin marca de agua)
┃➤ *.instagram* (foto/video)
┃➤ *.facebook* (video público)
┃➤ *.twitter* (video)
┃➤ *.pinterestdl* (descarga imagen)
┃➤ *.gitclone* (clonar repositorio GitHub)
╰━━━━━━━━━━━━━━━━━━━━⬣

Usa estos comandos con cuidado y responsabilidad.
`.trim()

  await conn.sendFile(m.chat, 'https://telegra.ph/file/64a8cfb61113c6b404768.jpg', 'descargas.jpg', menuDescargas, m)
}

handler.command = /^(descargasmenu|menudescargas)$/i
handler.tags = ['menu']
handler.help = ['descargasmenu', 'menudescargas']

export default handler
