export const handler = async (sock, m) => {
  try {
    const { key, message, pushName } = m
    const from = key.remoteJid
    const msg = message?.conversation || message?.extendedTextMessage?.text || ''

    const command = msg.startsWith('.') ? msg.trim().split(' ')[0].slice(1).toLowerCase() : null
    const args = msg.trim().split(' ').slice(1)

    if (!command) return

    if (command === 'menu') {
      await sock.sendMessage(from, {
        text: `*Hola ${pushName}*, este es el menú de *${global.botname}*:

> Comandos disponibles:
• .menu
• .play <nombre>
• .sticker
• .info
• y muchos más...
`
      }, { quoted: m })
    }

    if (command === 'info') {
      await sock.sendMessage(from, {
        text: `*LunaBot Oficial*
• Dueño: Tilín Ventas
• Número: wa.me/${global.owner[0]}
• Versión: 10.0`
      }, { quoted: m })
    }

  } catch (e) {
    console.error('Error en el handler:', e)
  }
}
