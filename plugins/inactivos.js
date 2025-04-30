let handler = async (m, { conn, participants, groupMetadata, usedPrefix, command }) => {
  const thresholdDays = 7 // Días de inactividad
  const kick = /kick|expulsar/i.test(command) // Si se usa .inactivoskick se expulsan

  let inactiveUsers = []

  for (let user of participants) {
    if (user.admin) continue // No expulsar admins
    let userData = global.db.data.users[user.id]
    if (!userData || !userData.lastseen) continue

    let diffDays = Math.floor((Date.now() - userData.lastseen) / (1000 * 60 * 60 * 24))
    if (diffDays >= thresholdDays) {
      inactiveUsers.push({ id: user.id, days: diffDays })
    }
  }

  if (inactiveUsers.length === 0) {
    return m.reply(`No hay miembros con más de ${thresholdDays} días de inactividad.`)
  }

  let list = inactiveUsers.map(u => `@${u.id.split('@')[0]} ┇ ${u.days} días sin actividad`).join('\n')
  m.reply(`*Miembros inactivos (+${thresholdDays} días):*\n\n${list}`, null, {
    mentions: inactiveUsers.map(u => u.id)
  })

  if (kick) {
    for (let u of inactiveUsers) {
      await conn.groupParticipantsUpdate(m.chat, [u.id], 'remove')
    }
    m.reply(`Se expulsaron ${inactiveUsers.length} inactivos del grupo.`)
  }
}

handler.command = /^inactivos(kick|expulsar)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
