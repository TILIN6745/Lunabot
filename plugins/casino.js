export const command = ['casino', 'slot', 'tragamonedas']
export const tags = ['juegos']
export const help = ['casino', 'slot', 'tragamonedas']

export const handler = async (m, { conn }) => {
  const emojis = ['🍒', '🍋', '🍊', '🍉', '⭐', '💎']
  const pick = () => emojis[Math.floor(Math.random() * emojis.length)]

  const [a, b, c] = [pick(), pick(), pick()]
  const resultado = `${a} | ${b} | ${c}`

  let respuesta = `┏━━━━━━━✦ *🎰 LUNA CASINO 🎰* ✦━━━━━━┓\n`
  respuesta += `┃ Resultado: ${resultado}\n`
  respuesta += `┃\n`

  if (a === b && b === c) {
    respuesta += `┃ ¡Jackpot! ¡Ganaste el premio mayor! 🏆\n`
  } else if (a === b || b === c || a === c) {
    respuesta += `┃ Casi ganas... ¡Suerte la próxima! ✨\n`
  } else {
    respuesta += `┃ Nada esta vez, inténtalo de nuevo. ❌\n`
  }

  respuesta += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`
  respuesta += `\n📌 *Comandos:* \n• .casino\n• .slot\n• .tragamonedas`

  await m.reply(respuesta)
}
