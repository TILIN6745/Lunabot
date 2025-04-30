const fetch = require('node-fetch')

let handler = async (m, { text, command }) => {
  if (!text) throw `Escribe el nombre de una ciudad.\nEjemplo: .clima Cancún`

  const API_KEY = 'TU_API_KEY_AQUÍ' // Reemplaza con tu API Key real
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(text)}&units=metric&lang=es&appid=${API_KEY}`)
  
  if (!res.ok) throw `No encontré información sobre esa ciudad.`

  const data = await res.json()
  const clima = `
*Clima en:* ${data.name}, ${data.sys.country}
*Temperatura:* ${data.main.temp}°C
*Sensación térmica:* ${data.main.feels_like}°C
*Humedad:* ${data.main.humidity}%
*Viento:* ${data.wind.speed} m/s
*Condición:* ${data.weather[0].description}
`.trim()

  m.reply(clima)
}

handler.help = ['clima [ciudad]']
handler.tags = ['herramientas']
handler.command = /^clima$/i

export default handler
