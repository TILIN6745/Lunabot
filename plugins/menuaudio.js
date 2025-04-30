const handler = async (m, { conn, usedPrefix }) => {
  const audios = [
    'Hola',
    'Bueno si',
    'Tilin',
    'Feliz cumpleaños',
    'Ala v3rg4',
    'Baneado',
    'Y eso que es',
    'No digas eso',
    'Chao',
    'UwU',
    'Miau',
    'Si mamá',
    'Fiesta del admin',
    'Epicardo',
    'Me voy',
    'Es viernes',
    'Admin pendejo',
    'Te gusta el anime',
    'La mamaste',
    'Vamo a calmarno',
    'El pepe',
    'El admin es gay',
    'Sexo',
    'Otaku de closet',
    'No me hables',
    'Te hackie',
    'No te metas',
    'Soy admin',
    'Eres noob',
    'Calla fan de BTS',
    'Vete a dormir',
    'Ya valio',
    'Soy pro',
    'Jaja xd',
    'Ño',
    'Siuuu',
    'Quien es tu sempai',
    'Se murió',
    'Me saludas',
    'Deja de joder'
  ]

  const texto = `
*╭━━〔 🎧 MENÚ DE AUDIOS - LunaBot 〕━━⬣*
*┃🔊 Audios disponibles:* ${audios.length}
${audios.map(audio => `┃🎵 ${usedPrefix + audio.toLowerCase().replace(/\s+/g, '')}`).join('\n')}
*╰━━━━━━━━━━━━━━━━━━━━━━━━━━⬣*
_Escribe el nombre o toca uno para reproducir._
`

  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender] }, { quoted: m })
}

handler.help = ['menuaudio']
handler.tags = ['menu']
handler.command = /^menuaudio$/i

export default handler
