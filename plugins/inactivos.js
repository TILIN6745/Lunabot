let handler = async (m, { conn, participants, groupMetadata }) => {
  let inactiveUsers = []
  let thresholdDays = 7 // Cambia los días de inactividad si deseas

  for (let user of participants) {
    let userData = global.db.data.users[user.id]
    if (!userData || !userData.lastseen) continue

    let diffDays = Math.floor((Date.now() - userData.lastseen) / (1000 * 60 * 60 * 24))
    if (diffDays >= thresholdDays) {
      inactiveUsers.push({ id: user.id, days: diffDays })
    }
  }

  if (inactiveUsers.length === 0) {
    return m.reply('Todos los miembros han estado activos recientemente.')
  }

  let list = inactiveUsers.map(u => `@${u.id.split('@')[0]} ┇ ${u.days} días sin actividad`).join('\n')
  m.reply(`*Miembros inactivos por más de ${thresholdDays} días:*\n\n${list}`, null, {
    mentions: inactiveUsers.map(u => u.id)
  })
}

handler.command = /^inactivos$/i
handler.group = true
handler.admin = true

export default handler
