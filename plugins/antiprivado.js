let handler = async (m, { conn, isOwner }) => {
  // Lista blanca de usuarios permitidos
  const whitelist = [
    '528336105471@s.whatsapp.net', // Dueño (Tilin Ventas)
    // Agrega más números si deseas
  ]

  if (m.isGroup || isOwner || whitelist.includes(m.sender)) return

  await m.reply(`*LunaBot Oficial*

Hola ${m.name || 'usuario'}, este bot no responde mensajes privados.

Si necesitas ayuda, únete a nuestro canal o contacta con el dueño:
- Canal: https://whatsapp.com/channel/0029VauK3kA4SpkPQyez1z00
- Dueño: wa.me/528336105471

Serás bloqueado automáticamente si sigues escribiendo.`)

  await conn.updateBlockStatus(m.sender, "block")
}

handler.customPrefix = /.*/
handler.command = new RegExp
handler.private = true
handler.fail = null

export default handler
