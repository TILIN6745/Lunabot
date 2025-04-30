import fs from 'fs'
let users = JSON.parse(fs.readFileSync('./lib/database.json'))

export const command = ['regalar']
export const tags = ['juegos']
export const help = ['regalar @usuario cantidad']

export const handler = async (m, { args, participants }) => {
  let senderId = m.sender
  if (!users[senderId]) users[senderId] = { coins: 500 }

  let mentioned = m.mentionedJid && m.mentionedJid[0]
  let amount = parseInt(args[1])

  if (!mentioned) return m.reply(`✳️ Menciona a quién deseas regalar monedas.\nEjemplo: *.regalar @usuario 100*`)
  if (isNaN(amount) || amount <= 0) return m.reply(`✳️ Escribe una cantidad válida para regalar.`)
  if (amount > users[senderId].coins) return m.reply(`❌ No tienes suficientes monedas para regalar.`)

  if (!users[mentioned]) users[mentioned] = { coins: 500 }

  users[senderId].coins -= amount
  users[mentioned].coins += amount

  fs.writeFileSync('./lib/database.json', JSON.stringify(users, null, 2))

  await m.reply(`🎁 Regalaste *${amount}* monedas a *@${mentioned.split('@')[0]}*\n\n💰 Tu nuevo saldo: ${users[senderId].coins}`, null, {
    mentions: [mentioned]
  })
}
