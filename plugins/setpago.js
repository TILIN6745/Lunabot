import fs from 'fs'
const PATH = './archivos/pago.txt'

let handler = async (m, { text, conn, command, isAdmin, isOwner, isBotAdmin }) => {
  if (!isOwner && !isAdmin) return m.reply('❌ Solo el dueño o un administrador del grupo puede usar este comando.')
  
  fs.existsSync('./archivos') || fs.mkdirSync('./archivos')
  if (!text) return m.reply('✳️ Escribe el mensaje de pago que deseas guardar.\nEjemplo:\n.setpago Cuenta BBVA: 1234...')
  
  fs.writeFileSync(PATH, text)
  m.reply('✅ Información de pago actualizada.')
}

handler.command = /^setpago$/i
handler.tags = ['group']
handler.help = ['setpago <mensaje>']
handler.group = true

export default handler
