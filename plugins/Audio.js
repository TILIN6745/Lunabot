const audios = {
  tilin: './media/audios/tilin.mp3',
  hola: './media/audios/hola.mp3',
  baneado: './media/audios/baneado.mp3',
  uwu: './media/audios/uwu.mp3',
  elpepe: './media/audios/elpepe.mp3',
  mesaludas: './media/audios/mesaludas.mp3',
  fiesta: './media/audios/fiestaadmin.mp3',
  jajaxd: './media/audios/jajaxd.mp3'
}

const handler = async (m, { conn, text, command }) => {
  const lower = text.toLowerCase()

  if (command === 'menuaudio') {
    let menu = `*🎵 MENÚ DE AUDIOS DISPONIBLES:*\n\n`
    menu += Object.keys(audios).map(name => `• ${name}`).join('\n')
    menu += `\n\n_Usa las palabras exactas para reproducir el audio._`
    return m.reply(menu)
  }

  const audioFile = audios[lower]
  if (audioFile) {
    await conn.sendPresenceUpdate('recording', m.chat)
    return conn.sendMessage(m.chat, { audio: { url: audioFile }, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
  }
}
handler.command = ['menuaudio', ...Object.keys(audios)]
export default handler
