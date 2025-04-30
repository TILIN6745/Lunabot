const handler = async (m, { conn, command, isAdmin, isBotAdmin, isROwner }) => {
  if (!m.isGroup) throw '✋ Este comando solo se usa en grupos.'
  if (!isAdmin) throw '🔐 Solo los administradores pueden usar este comando.'
  if (!isBotAdmin) throw '⚠️ Necesito permisos de administrador para hacer eso.'

  let texto = ''
  if (command === 'abrirgrupo') {
    await conn.groupSettingUpdate(m.chat, 'not_announcement')
    texto = `
╔═══✦✦═══╗
  *LunaBot Oficial*
╚═══✦✦═══╝

🟢 El grupo ha sido *ABIERTO*.
✉️ Todos pueden enviar mensajes.
⏰ Hora: ${new Date().toLocaleTimeString()}
`.trim()
  } else if (command === 'cerrargrupo') {
    await conn.groupSettingUpdate(m.chat, 'announcement')
    texto = `
╔═══⛔️═══╗
  *LunaBot Oficial*
╚═══⛔️═══╝

🔒 El grupo ha sido *CERRADO*.
👮 Solo admins pueden escribir.
⏰ Hora: ${new Date().toLocaleTimeString()}
`.trim()
  }

  m.reply(texto)
}

handler.command = ['abrirgrupo', 'cerrargrupo']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
