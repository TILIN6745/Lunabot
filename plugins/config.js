let handler = async (m, { conn }) => {
  const id = m.chat

  global.db = global.db || {}
  global.db.settings = global.db.settings || {}
  global.db.settings[id] = global.db.settings[id] || {}

  const set = global.db.settings[id]

  const status = (v) => v ? '✅ ACTIVADO' : '❌ DESACTIVADO'

  let txt = `*🔧 CONFIGURACIONES DEL GRUPO*\n\n`
  txt += `> 🧷 *Anti-Link:* ${status(set.antilink)}\n`
  txt += `> 👤 *Anti-Fake:* ${status(set.antifake)}\n`
  txt += `> ✋ *Anti-Tóxicos:* ${status(set.antitoxic)}\n`
  txt += `> 👋 *Bienvenida:* ${status(set.welcome)}\n`
  txt += `> 📥 *Detectar Cambios:* ${status(set.detect)}\n`
  txt += `> 🚫 *Anti-Privados:* ${status(set.antiprivado)}\n`
  txt += `> 📛 *Anti-Eliminados:* ${status(set.antidelete)}\n`
  txt += `> ❗ *Modohorny:* ${status(set.modohorny)}\n`

  txt += `\nUsa los comandos: *.nombre on* / *.nombre off*\nEjemplo: *.welcome on*`

  m.reply(txt)
}

handler.command = /^config$/i
handler.group = true
handler.admin = true

export default handler
