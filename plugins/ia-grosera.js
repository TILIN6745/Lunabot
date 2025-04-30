import fetch from 'node-fetch'

const respuestasFinales = [
  'Y no me hagas repetirlo, ¿sí?',
  '¿Eso era todo? Vaya pérdida de tiempo...',
  'Aprende a usar el bot, por favor.',
  'Por cosas como esta me reinicio sola.',
  'Con gusto, aunque preferiría estar apagada.',
  'De nada, inútil.',
  'Ni Tilín me aguanta a veces, pero bueno...'
]

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `*[❗] ¿Y el texto, genio? Usa así: ${usedPrefix + command} ¿Qué es la vida?*`

  try {
    const texto = args.join(" ")
    const res = await fetch(`https://aemt.me/gpt4?text=${encodeURIComponent(texto)}`)
    const json = await res.json()

    if (!json.text) throw '*[❗] No obtuve respuesta. Tal vez deberías hacer preguntas más inteligentes...*'

    const sarcasmo = respuestasFinales[Math.floor(Math.random() * respuestasFinales.length)]

    const respuesta = `
${json.text.trim()}

––––––––––––––––––––––––
IA creada por *Tilín Ventas*, así que no j*das.
${sarcasmo}
`.trim()

    m.reply(respuesta)
  } catch (e) {
    console.error(e)
    m.reply('*[❗] Algo salió mal, como tu existencia.*')
  }
}

handler.command = ['ia', 'chatgpt']
handler.help = ['ia <texto>']
handler.tags = ['ai']
handler.register = true

export default handler
