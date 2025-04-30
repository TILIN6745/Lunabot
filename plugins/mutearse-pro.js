let muteList = global.muteList || (global.muteList = {})

const handler = async (m, { conn, args, isAdmin, isBotAdmin, participants, usedPrefix, command }) => {
  if (!m.isGroup) return
  const groupId = m.chat

  // Detectar y eliminar mensajes de usuarios muteados
  if (muteList[groupId] && muteList[groupId].includes(m.sender)) {
    if (m.isBaileys) return
    await conn.sendMessage(m.chat, { delete: m.key })
    return
  }

  // Comandos mute / unmute
  if (command === 'muteuser' || command === 'unmuteuser') {
    if (!isAdmin) throw '*[ ⚠️ ] Solo los administradores pueden usar este comando.*'
    if (!isBotAdmin) throw '*[ ⚠️ ] Necesito permisos de administrador para realizar esta acción.*'

    let user = m.mentionedJid[0] || (args[0] ? conn.decodeJid(args[0]) : null)
    if (!user) throw `*[❗] Debes etiquetar o responder a un usuario.*\n\nEjemplo:\n${usedPrefix + command} @usuario`

    if (participants.find(p => p.id === user)?.admin) throw '*[❗] No puedo silenciar a otro administrador.*'

    muteList[groupId] = muteList[groupId] || []

    if (command === 'muteuser') {
      if (!muteList[groupId].includes(user)) muteList[groupId].push(user)
      await conn.sendMessage(m.chat, {
        text: `*[🔇 MUTE ACTIVADO]*\n\n@${user.split('@')[0]} ha sido silenciado. Todos sus mensajes serán eliminados.`,
        mentions: [user]
      })
    } else if (command === 'unmuteuser') {
      muteList[groupId] = muteList[groupId].filter(id => id !== user)
      await conn.sendMessage(m.chat, {
        text: `*[🔊 MUTE DESACTIVADO]*\n\n@${user.split('@')[0]} ya puede volver a escribir sin restricciones.`,
        mentions: [user]
      })
    }
  }
}

handler.help = ['muteuser @usuario', 'unmuteuser @usuario']
handler.tags = ['grupo']
handler.command = /^(muteuser|unmuteuser)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
