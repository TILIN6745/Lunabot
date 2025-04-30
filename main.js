//═════════════════════════════════════════════//
//                MAIN DE LUNABOT              //
//═════════════════════════════════════════════//

import { default as makeWASocket } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import { useSingleFileAuthState } from '@whiskeysockets/baileys'
import P from 'pino'
import fs from 'fs'
import path from 'path'

// Importamos la configuración global
import './config.js'

// Base de datos
global.db = JSON.parse(fs.readFileSync(global.database.archivo)) || {}

// Autenticación
const { state, saveState } = useSingleFileAuthState('./session.json')

// Función principal
async function iniciarBot() {
  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    browser: ['LunaBot', 'Chrome', '1.0.0']
  })

  // Guardar estado cada cierto tiempo
  setInterval(() => {
    saveState()
    fs.writeFileSync(global.database.archivo, JSON.stringify(global.db, null, 2))
  }, 30_000)

  // Eventos
  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const msg = messages[0]
      if (!msg.message) return

      const from = msg.key.remoteJid
      const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
      const command = global.comandos.prefijos.find(p => body.startsWith(p)) ? body.trim().split(/ +/).shift().toLowerCase() : ''

      // Ejemplo comando básico: .ping
      if (command === '.ping') {
        await sock.sendMessage(from, { text: 'Pong! 🏓' })
      }

      // Aquí puedes añadir más comandos personalizados
    } catch (e) {
      console.error('❌ Error en mensaje:', e)
    }
  })

  // Reconexión automática
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const motivo = new Boom(lastDisconnect?.error)?.output?.statusCode
      if (motivo !== DisconnectReason.loggedOut) iniciarBot()
    }
  })
}

// Ejecutamos el bot
iniciarBot()
