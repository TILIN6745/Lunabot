const choices = ['piedra','papel','tijera']

export default async function rps(sock, m, args) {
  const chat = m.key.remoteJid
  const user = args[0] && args[0].toLowerCase()
  if (!choices.includes(user)) {
    return sock.sendMessage(chat, { text: `Uso: .rps <piedra|papel|tijera>` }, { quoted: m })
  }
  const bot = choices[Math.floor(Math.random() * 3)]
  let result = ''
  if (user === bot) result = '🤝 Empate'
  else if (
    (user==='piedra' && bot==='tijera') ||
    (user==='tijera' && bot==='papel') ||
    (user==='papel' && bot==='piedra')
  ) result = '🎉 Ganaste'
  else result = '😢 Perdiste'

  const text = `Tu: *${user}*\nBot: *${bot}*\n\n${result}!`
  await sock.sendMessage(chat, { text }, { quoted: m })
}

export const command = ['rps']
export const group = false
export const admin = false
export const botAdmin = false
