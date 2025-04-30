import fs from 'fs'
const PATH = './archivos/pago.txt'

let handler = async (m, { conn }) => {
  let pago = fs.existsSync(PATH) ? fs.readFileSync(PATH).toString() : '⚠️ No se ha configurado el mensaje de pago aún.\nUsa *.setpago <mensaje>*'
  m.reply(`*💳 INFORMACIÓN DE PAGO:*\n\n${pago}`)
}

handler.command = /^pago$/i
handler.tags = ['info']
handler.help = ['pago']

export default handler
