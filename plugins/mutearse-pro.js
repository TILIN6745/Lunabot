const handler = async (m, { conn, args, isAdmin, isBotAdmin, participants, usedPrefix, command }) => {
  if (!m.isGroup) throw '*[ ⚠️ ] Este comando solo se puede usar en grupos.*'
  if (!isAdmin) throw '*[ ⚠️ ] Solo los administradores pueden usar este comando.*'
  if (!isBotAdmin) throw '*[ ⚠️ ] Necesito permisos de administrador para realizar esta acción.*'

  let user = m.mentionedJid[0] || (args[0] ? conn.decodeJid(args[0]) : null)
  if (!user) throw `*[❗] Debes etiquetar o responder a un usuario.*\n\nEjemplo:\n${usedPrefix + command} @usuario`

  if (user === conn.user.jid) throw '*[❗] No puedo silenciarme a mí mismo.*'
  if (user === m.sender) throw '*[❗] No puedes silenciarte tú mismo.*'
  if (participants.find(p => p.id === user)?.admin) throw '*[❗] No puedo silenciar a otro administrador.*'

  if (command === 'muteuser') {
    await conn.groupParticipantsUpdate(m.chat, [user], 'restrict')
    await conn.sendMessage(m.chat, {
      text: `*[🔇 MUTE ACTIVADO]*\n\n@${user.split('@')[0]} ha sido silenciado y no podrá enviar mensajes.`,
      mentions: [user]
    })
  } else if (command === 'unmuteuser') {
    await conn.groupParticipantsUpdate(m.chat, [user], 'unrestrict')
    await conn.sendMessage(m.chat, {
      text: `*[🔊 MUTE DESACTIVADO]*\n\n@${user.split('@')[0]} ya puede volver a enviar mensajes.`,
      mentions: [user]
    })
  }
}

handler.help = ['muteuser @usuario', 'unmuteuser @usuario']
handler.tags = ['grupo']
handler.command = /^(muteuser|unmuteuser)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
