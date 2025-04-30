// Ⓛ𝕃𝕦𝕟𝕒𝔹𝕠𝕥 - Plugin: playv2.js
import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*[❗] Ingresa el nombre de un video para buscar*\n\n*Ejemplo:* ${usedPrefix}${command} Bizarrap Shakira`

  try {
    const search = await yts(text)
    const video = search.videos[0]
    if (!video) throw '*[❗] No se encontró resultado.*'

    let info = `*╭─「 VIDEO ENCONTRADO 」─╮*\n`
    info += `*│ Título:* ${video.title}\n`
    info += `*│ Duración:* ${video.timestamp}\n`
    info += `*│ Subido por:* ${video.author.name}\n`
    info += `*│ Vistas:* ${video.views.toLocaleString()}\n`
    info += `*╰──────────────────────╯*`
    await conn.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: info }, { quoted: m })

    const res = await fetch(`https://api.lunabot.lat/ytmp4?url=${video.url}`)
    const json = await res.json()
    if (!json.ok) throw '*[❗] Error descargando el video.*'

    await conn.sendMessage(m.chat, { video: { url: json.video }, mimetype: 'video/mp4' }, { quoted: m })
  } catch (e) {
    console.error(e)
    throw '*[❗] Ocurrió un error al procesar el video.*'
  }
}

handler.command = /^playvideo$/i
handler.register = true
handler.limit = 1
handler.exp = 40

export default handler
