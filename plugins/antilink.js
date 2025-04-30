// Plugin: antilink.js
import fs from 'fs'

let antilink = global.antilink = global.antilink || {} // Guardado por grupo

const enlaces = [
  'https://chat.whatsapp.com',
  'wa.me/',
  't.me/',
  'discord.gg/',
  'http',
  '.gg',
  '.com'
]

const handler = async (m, { conn, isAdmin, isBotAdmin, command, args }) => {
  const id = m.chat

  // Activador del comando .antilink on/off
  if (/^antilink$/i.test(command)) {
    if (!m.isGroup) return m.reply('Este comando solo funciona en grupos.')
    if (!isAdmin) return m.reply('Solo los administradores pueden activar o desactivar el anti-enlace.')

    if (!args[0]) return m.reply(`Usa:\n*${command} on* para activar\n*${command} off* para desactivar`)

    if (args[0] === 'on') {
      antilink[id] = true
      return m.reply('✅ Anti-enlace activado en este grupo.')
    } else if (args[0] === 'off') {
      delete antilink[id]
      return m.reply('❌ Anti-enlace desactivado en este grupo.')
    } else {
      return m.reply('Opción no válida. Usa "on" o "off".')
    }
  }

  // Detección de enlaces si está activo
  if (antilink[id] && m.isGroup && !m.fromMe) {
    let texto = m.text || ''
    if (!texto) return

    const contieneEnlace = enlaces.some(enlace => texto.toLowerCase().includes(enlace))
    if (!contieneEnlace) return

    if (isAdmin) return // Permitir enlaces de administradores

    if (isBotAdmin) {
      await conn.sendMessage(m.chat, {
        text: `*🚫 Enlace detectado, ${m.pushName}.*\nMensaje eliminado.`,
      })
      // Puedes elegir entre eliminar el mensaje o sacar al usuario:
      // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      await conn.sendMessage(m.chat, { delete: m.key })
    } else {
      await conn.sendMessage(m.chat, {
        text: `*Enlace detectado de ${m.pushName}, pero no soy admin para actuar.*`,
      })
    }
  }
}

handler.command = /^antilink$/i
handler.group = true
handler.admin = true
handler.botAdmin = false
handler.fail = null

export default handler
