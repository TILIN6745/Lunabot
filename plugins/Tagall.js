import { areJidsSameUser } from '@whiskeysockets/baileys'

const handler = async (m, { conn, participants, usedPrefix, command }) => {
  let text = `╭══• ೋ•✧๑♡๑✧•ೋ •══╮\n`
  text += `*『 ${conn.user.name} 』*\n`
  text += `╰══• ೋ•✧๑♡๑✧•ೋ •══╯\n\n`
  text += `*🎀 Mencionando a ${participants.length} integrantes:*\n\n`
  const emoji = '✨' // Emoji de las menciones
  for (const user of participants) {
    text += `${emoji} @${user.id.split('@')[0]}\n`
  }

  m.reply(text, null, {
    mentions: participants.map(p => p.id)
  })
}

handler.command = /^tagall|todos$/i
handler.group = true

export default handler
