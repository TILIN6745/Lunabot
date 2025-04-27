const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const { Boom } = require("@hapi/boom")
const P = require("pino")

async function connectBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('Conexión cerrada. Reconectando...', shouldReconnect)
            if (shouldReconnect) {
                connectBot()
            }
        } else if (connection === 'open') {
            console.log('Bot conectado exitosamente!')
        }
    })

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return

        const from = msg.key.remoteJid
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ''

        console.log(`Mensaje de ${from}: ${body}`)

        // Comandos básicos
        if (body.startsWith('!ping')) {
            await sock.sendMessage(from, { text: 'Pong!' })
        } else if (body.startsWith('!menu')) {
            await sock.sendMessage(from, { text: 'Comandos disponibles:\n!ping\n!menu' })
        }
    })

    sock.ev.on('creds.update', saveCreds)
}

connectBot()
