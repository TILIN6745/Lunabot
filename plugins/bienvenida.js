let handler = async (m, { conn }) => {
  if (!m.isGroup) return
  if (!(m.messageStubType == 27 || m.messageStubType == 29)) return

  let who = m.messageStubParameters?.[0]
  if (!who) return

  const groupMetadata = await conn.groupMetadata(m.chat)
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'Sin descripción disponible'
  const userName = (await conn.getName(who)) || 'Invitado'

  // Ruta de la imagen que tú pongas en media/
  const imagenBienvenida = './media/bienvenida.jpg'
  const imagenDespedida = './media/despedida.jpg'

  if (m.messageStubType == 27) {
    let texto = `╭━━━〔 *BIENVENIDO/A* 〕━━━✦\n┃👤 𝗡𝗼𝗺𝗯𝗿𝗲: @${who.split('@')[0]}\n┃🏠 𝗚𝗿𝘂𝗽𝗼: *${groupName}*\n┃📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶ó𝗻:\n┃${groupDesc}\n╰━━━━━━━━━━━━━━━━━✦`
    await conn.sendMessage(m.chat, { image: { url: imagenBienvenida }, caption: texto, mentions: [who] })
  }

  if (m.messageStubType == 29) {
    let texto = `╭━━━〔 *DESPEDIDA* 〕━━━✦\n┃👤 𝗡𝗼𝗺𝗯𝗿𝗲: @${who.split('@')[0]}\n┃🏠 𝗚𝗿𝘂𝗽𝗼: *${groupName}*\n┃👋 Esperamos verte pronto.\n╰━━━━━━━━━━━━━━━━━✦`
    await conn.sendMessage(m.chat, { image: { url: imagenDespedida }, caption: texto, mentions: [who] })
  }
}

export default handler
