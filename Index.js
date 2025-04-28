import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import pino from 'pino'
import chalk from 'chalk'
import { readdirSync } from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return

        const from = msg.key.remoteJid
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (!text) return

        // Carga automática de plugins
        const plugins = readdirSync('./plugins').filter(file => file.endsWith('.js'))
        for (let plugin of plugins) {
            let command = await import(`./plugins/${plugin}`)
            if (typeof command.default === 'function') {
                command.default(sock, msg, text, from)
            }
        }
    })

    sock.ev.on('connection.update', update => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(chalk.red('Bad session, Please delete session and scan again'))
                sock.logout()
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.red('Connection closed, reconnecting...'))
                startBot()
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.red('Connection Lost from Server, reconnecting...'))
                startBot()
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(chalk.red('Connection Replaced, another new session opened, please close current session first'))
                sock.logout()
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red('Device Logged Out, Please Scan Again And Run.'))
                sock.logout()
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.yellow('Restart Required, Restarting...'))
                startBot()
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.red('Connection TimedOut, Reconnecting...'))
                startBot()
            } else {
                sock.end(`Unknown DisconnectReason: ${reason}|${connection}`)
            }
        } else if (connection === 'open') {
            console.log(chalk.green('BOT LISTO! LUNA BOT ESTÁ ONLINE'))
        }
    })
}

startBot()
