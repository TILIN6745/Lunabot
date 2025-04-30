const fetch = require('node-fetch')
const moment = require('moment-timezone')

let handler = async (m, { text, command }) => {
  let zona = text.trim().toLowerCase()

  const zonas = {
    "méxico": "America/Mexico_City",
    "colombia": "America/Bogota",
    "perú": "America/Lima",
    "chile": "America/Santiago",
    "argentina": "America/Argentina/Buenos_Aires",
    "venezuela": "America/Caracas",
    "españa": "Europe/Madrid",
    "eeuu": "America/New_York",
    "brasil": "America/Sao_Paulo",
    "japón": "Asia/Tokyo",
    "india": "Asia/Kolkata"
  }

  if (!zona) {
    let resultado = Object.entries(zonas).map(([pais, zona]) => {
      return `🌍 *${pais.charAt(0).toUpperCase() + pais.slice(1)}*: ${moment().tz(zona).format('HH:mm:ss')}`
    }).join('\n')
    m.reply(`*Hora actual en países populares:*\n\n${resultado}`)
  } else if (zonas[zona]) {
    let hora = moment().tz(zonas[zona]).format('HH:mm:ss')
    m.reply(`La hora actual en *${zona}* es: ${hora}`)
  } else {
    m.reply('País no reconocido. Prueba con: México, Colombia, Argentina, Japón, etc.')
  }
}

handler.command = /^hora$/i
module.exports = handler
