import db from '../lib/database.js'

let handler = async (m, { text, command }) => {
  if (!m.isGroup) throw 'Este comando solo se usa en grupos.'

  db.data.welcome = db.data.welcome || {}
  db.data.bye = db.data.bye || {}

  if (command == 'setwelcome') {
    if (!text) throw 'Usa: *.setwelcome Tu mensaje de bienvenida*'
    db.data.welcome[m.chat] = text
    await m.reply('✅ Mensaje de bienvenida actualizado.')
  }

  if (command == 'setbye') {
    if (!text) throw 'Usa: *.setbye Tu mensaje de despedida*'
    db.data.bye[m.chat] = text
    await m.reply('✅ Mensaje de despedida actualizado.')
  }
}

handler.command = ['setwelcome', 'setbye']
handler.group = true
handler.admin = true

export default handler
