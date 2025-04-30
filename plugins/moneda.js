import fs from 'fs'
import { toCommas } from '../lib/funciones.js' // Asegúrate de tener esta función o crearla

let users = JSON.parse(fs.readFileSync('./lib/database.json'))

export const command = ['monedas', 'saldo', 'money', 'coins']
export const tags = ['economía']
export const help = ['monedas']

export const handler = async (m, { conn }) => {
  let userId = m.sender

  // Inicializa usuario si no existe
  if (!users[userId]) users[userId] = { coins: 500 }

  let saldo = users[userId].coins
  let mensaje = `┏━━━━━━━━━━━━━━┓
┃     *💸 SALDO ACTUAL 💸*     
┗━━━━━━━━━━━━━━┛
*👤 Usuario:* @${userId.split('@')[0]}
*💰 Monedas:* ${toCommas(saldo)} monedas

Usa *.casino* para jugar o *.regalar @usuario cantidad* para compartir.`

  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: [userId]
  }, { quoted: m })
}
