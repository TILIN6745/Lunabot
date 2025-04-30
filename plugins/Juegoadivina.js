let juegos = global.juegos = global.juegos || {}

export const command = ['adivina', 'adivinanza']
export const handler = async (m, { conn, args, usedPrefix, command }) => {
  let id = m.chat

  if (juegos[id]) return m.reply('Ya hay un juego en curso aquí, usa *rendirse* para terminar.')

  let secreto = Math.floor(Math.random() * 10) + 1
  juegos[id] = { numero: secreto, intentos: 3 }

  m.reply(`🎯 Adivina un número del 1 al 10\nTienes 3 intentos.\nResponde con *${usedPrefix}${command} <número>*`)
}

export const before = async (m, { args, command }) => {
  let id = m.chat
  let juego = global.juegos?.[id]
  if (!juego) return

  let num = parseInt(args[0])
  if (isNaN(num)) return m.reply('Por favor, ingresa un número válido.')

  if (num === juego.numero) {
    delete global.juegos[id]
    return m.reply(`🎉 ¡Felicidades! Adivinaste el número *${num}* correctamente.`)
  } else {
    juego.intentos--
    if (juego.intentos <= 0) {
      delete global.juegos[id]
      return m.reply(`❌ Te quedaste sin intentos. El número era *${juego.numero}*.`)
    } else {
      return m.reply(`❌ Incorrecto. Te quedan *${juego.intentos}* intento(s).`)
    }
  }
}
