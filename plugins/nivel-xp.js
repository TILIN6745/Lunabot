let xp = global.db.data.users

export default async function handler(m, { conn }) {
  if (!m.chat.endsWith('@g.us')) return // Solo en grupos

  let user = xp[m.sender]
  if (!user) {
    xp[m.sender] = {
      exp: 0,
      level: 0,
    }
    user = xp[m.sender]
  }

  let gain = Math.floor(Math.random() * 10) + 5 // XP aleatoria
  user.exp += gain

  // Fórmula para subir de nivel
  let levelUpExp = 100 + (user.level * 50)
  if (user.exp >= levelUpExp) {
    user.exp -= levelUpExp
    user.level++
    conn.reply(m.chat, `🎉 Felicidades *${conn.getName(m.sender)}* subiste a nivel *${user.level}*!`, m)
  }
}
