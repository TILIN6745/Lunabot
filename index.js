import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys'
import { handler } from './handler.js'
import { Boom } from '@hapi/boom'
import P from 'pino'

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    logger: P({ level: 'silent' }),
    browser: ['LunaBot', 'Chrome', '10.0'],
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return
    await handler(sock, m)
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) {
        console.log('Reconectando...')
        startBot()
      } else {
        console.log('Conexión cerrada. Debes volver a escanear el QR.')
      }
    } else if (connection === 'open') {
      console.log('LunaBot conectado correctamente')
    }
  })

  sock.ev.on('creds.update', saveCreds)
}

start('main.js')
