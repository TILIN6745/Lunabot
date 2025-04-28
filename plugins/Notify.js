// plugins/notify.js
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.isGroup) throw '❗ Este comando solo funciona en grupos.'
  if (!text) throw `⚠️ Uso: *${usedPrefix + command} [tu mensaje]*`

  // Construye el mensaje de notificación
  let notifyMessage = `🚨 *NOTIFICACIÓN* 🚨\n\n`
  notifyMessage += `${text}\n\n`
  notifyMessage += `Atentamente: *${conn.user.name}*`

  // Envía sin mentions
  await conn.sendMessage(m.chat, { text: notifyMessage }, { quoted: m })
}

handler.command = ['notify','n','notificacion','alerta']  // alias
handler.group = true          // sólo en grupos
handler.admin = true          // sólo admins pueden usar
handler.botAdmin = true       // el bot debe ser admin

export default handler
