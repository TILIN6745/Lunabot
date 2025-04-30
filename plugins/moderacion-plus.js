// plugins/moderacion-plus.js

let bannedUsers = global.bannedUsers = global.bannedUsers || {}

let handler = async (m, { conn, args, command, participants, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) throw 'Este comando solo se puede usar en grupos.'
  if (!isAdmin) throw 'Necesitas ser admin.'
  if (!isBotAdmin) throw 'Necesito ser admin para hacer eso.'

  let user = m.mentionedJid[0] || (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
  if (!user) throw 'Etiqueta o escribe el número de la persona.'

  switch (command) {
    case 'kick':
      if (user === conn.user.jid) return m.reply('No me puedo expulsar.')
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
      m.reply(`✅ Usuario expulsado.`)
      break

    case 'ban':
      bannedUsers[user] = true
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
      m.reply(`⛔ Usuario baneado.`)
      break

    case 'unban':
      delete bannedUsers[user]
      m.reply(`✅ Usuario desbaneado.`)
      break

    case 'banlist':
      let list = Object.keys(bannedUsers)
      m.reply(list.length ? `Lista de baneados:\n${list.map(v => '• @' + v.split('@')[0]).join('\n')}` : 'No hay usuarios baneados.', null, { mentions: list })
      break
  }
}

handler.help = ['kick @user','ban @user','unban @user','banlist']
handler.tags = ['group']
handler.command = /^(kick|ban|unban|banlist)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
