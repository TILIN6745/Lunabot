import db from '../lib/database.js'

let handler = async (m, { conn }) => {
  if (!m.isGroup) return
  if (!(m.messageStubType == 27 || m.messageStubType == 29)) return

  let who = m.messageStubParameters?.[0]
  if (!who) return

  const groupMetadata = await conn.groupMetadata(m.chat)
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'Sin descripción disponible'
  const botName = conn.user.name

  // Ruta de imágenes
  const imagenBienvenida = './media/bienvenida.jpg'
  const imagenDespedida = './media/despedida.jpg'

  // Mensajes configurables
  let welcome = db.data.welcome?.[m.chat] || `╭━━━〔 *BIENVENIDO/A* 〕━━━✦
┃👤 Nombre: @${who.split('@')[0]}
┃🏠 Grupo: *${groupName}*
┃📝 Descripción:
┃${groupDesc}
┃🤖 Bot: *${botName}*
╰━━━━━━━━━━━━━━━━━✦`

  let bye = db.data.bye?.[m.chat] || `╭━━━〔 *DESPEDIDA* 〕━━━✦
┃👤 Nombre: @${who.split('@')[0]}
┃🏠 Grupo: *${groupName}*
┃👋 Esperamos verte pronto.
┃🤖 Bot: *${botName}*
╰━━━━━━━━━━━━━━━━━✦`

  if (m.messageStubType == 27) {
    await conn.sendMessage(m.chat, { image: { url: imagenBienvenida }, caption: welcome, mentions: [who] })
  }
  if (m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { image: { url: imagenDespedida }, caption: bye, mentions: [who] })
  }
}

export default handler
