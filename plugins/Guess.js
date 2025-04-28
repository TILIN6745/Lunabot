// plugins/guess.js
const games = {}

export default async function guess(sock, m, args) {
  const chat = m.key.remoteJid
  // iniciar juego
  if (!args[0] || isNaN(args[0])) {
    // crear número secreto
    const secret = Math.floor(Math.random() * 20) + 1
    games[chat] = secret
    return sock.sendMessage(chat, { text: `🎲 He pensado un número entre 1 y 20.\n¡Intenta adivinarlo con .guess <número>!` }, { quoted: m })
  }
  // intentar adivinar
  const guess = parseInt(args[0])
  const secret = games[chat]
  if (!secret) return sock.sendMessage(chat, { text: `Primero inicia el juego con .guess` }, { quoted: m })
  if (guess === secret) {
    delete games[chat]
    return sock.sendMessage(chat, { text: `🎉 ¡Correcto! El número era ${secret}. Felicidades.` }, { quoted: m })
  }
  const hint = guess < secret ? 'más alto ↑' : 'más bajo ↓'
  return sock.sendMessage(chat, { text: `❌ Fallaste. Prueba ${hint}.` }, { quoted: m })
}

export const command = ['guess']
export const group = false
