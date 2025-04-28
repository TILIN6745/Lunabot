// plugins/rps.js
const choices = ['piedra','papel','tijera']

export default async function rps(sock, m, args) {
  const user = args[0] && args[0].toLowerCase()
  if (!choices.includes(user)) {
    return sock.sendMessage(m.key.remoteJid, { text: `Uso: .rps <piedra|papel|t
