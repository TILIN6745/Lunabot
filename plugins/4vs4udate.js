let torneos = {}

const handler = async (m, { conn, usedPrefix, command, text }) => {
  const id = m.chat
  torneos[id] = torneos[id] || {
    nombre: text || 'Torneo Free Fire',
    jugadores: []
  }

  const torneo = torneos[id]
  const nombreJugador = await conn.getName(m.sender)

  if (torneo.jugadores.includes(m.sender)) {
    return m.reply(`⚠️ *${nombreJugador}* ya estás en la lista.`)
  }

  torneo.jugadores.push(m.sender)

  let textoJugadores = torneo.jugadores
    .map((jid, i) => `*${i + 1}.* ${conn.getName(jid)}`)
    .join('\n')

  m.reply(`🎯 *${nombreJugador}* se ha unido al torneo *${torneo.nombre}*\n\n*Jugadores actuales:*\n${textoJugadores}`)

  // Si ya hay 8 jugadores, crear los equipos
  if (torneo.jugadores.length === 8) {
    let mezclados = torneo.jugadores.sort(() => Math.random() - 0.5)
    let equipo1 = mezclados.slice(0, 4).map((jid, i) => `*${i + 1}.* ${conn.getName(jid)}`).join('\n')
    let equipo2 = mezclados.slice(4, 8).map((jid, i) => `*${i + 5}.* ${conn.getName(jid)}`).join('\n')

    m.reply(`✅ *Torneo completo: ${torneo.nombre}*

🏆 *Equipo 1:*
${equipo1}

⚔️ *Equipo 2:*
${equipo2}

¡Que gane el mejor!`)

    delete torneos[id] // Reiniciar el torneo para el siguiente
  }
}

handler.help = ['sala']
handler.tags = ['freefire']
handler.command = /^4vs4$/i

export default handler
