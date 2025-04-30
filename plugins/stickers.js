import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let stiker = null
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (/webp|image|video/.test(mime)) {
      let media = await q.download()
      let isVideo = /video/.test(mime)
      stiker = await sticker(media, isVideo, global.packname, global.author)
    } else if (text) {
      stiker = await sticker(null, false, global.packname, global.author, text)
    } else {
      return m.reply(`Envía una imagen, video o texto, o responde a uno con *${usedPrefix + command}*`)
    }

    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw 'No se pudo crear el sticker.'
  } catch (e) {
    console.error(e)
    m.reply('Error al crear el sticker.')
  }
}

handler.help = ['s', 'sticker']
handler.tags = ['sticker']
handler.command = /^s(ticker)?$/i
handler.limit = false

export default handler
