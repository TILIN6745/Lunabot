// Ⓛ𝕃𝕦𝕟𝕒𝔹𝕠𝕥 - Plugin: play2.js
import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*[❗] Ingresa el nombre de una canción para buscar*\n\n*Ejemplo:* ${usedPrefix}${command} Me Porto Bonito`
  
  try {
    const search = await yts(text)
    const video = search.videos[0]
    if (!video) throw '*[❗] No se encontró resultado.*'

    let info = `*╭───────────────◆*\n`
    info += `*│ Título:* ${video.title}\n`
    info += `*│ Duración:* ${video.timestamp}\n`
    info += `*│ Subido por:* ${video.author.name}\n`
    info += `*│ Vistas:* ${video.views.toLocaleString()}\n`
    info += `*╰───────────────◆*\n`
    await conn.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: info }, { quoted: m })

    const res = await fetch(`https://api.lunabot.lat/ytmp3?url=${video.url}`)
    const json = await res.json()
    if (!json.ok) throw '*[❗] Ocurrió un error descargando el audio.*'

    await conn.sendMessage(m.chat, { audio: { url: json.audio }, mimetype: 'audio/mp4' }, { quoted: m })
  } catch (e) {
    console.error(e)
    throw '*[❗] Error al buscar o descargar la canción.*'
  }
}

handler.command = /^play2$/i
handler.register = true
handler.limit = 1
handler.exp = 30

export default handler
