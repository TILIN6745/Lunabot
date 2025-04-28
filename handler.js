import { createBot } from '@whiskeysockets/baileys'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const plugins = {}

const loadPlugins = () => {
  const pluginDir = path.join(__dirname, './plugins')
  const pluginFiles = fs.readdirSync(pluginDir).filter(file => file.endsWith('.js'))
  
  for (const file of pluginFiles) {
    const pluginPath = path.join(pluginDir, file)
    const plugin = import(pluginPath)
    plugins[file.replace('.js', '')] = plugin
  }
}

const start = async () => {
  const { state, saveCreds } = await import('./auth.js')
  const { default: makeWASocket } = await import('@whiskeysockets/baileys')

  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''

    if (text.startsWith('.')) {
      const [commandName, ...args] = text.slice(1).trim().split(/ +/)
      const command = plugins[commandName.toLowerCase()]
      
      if (command) {
        try {
          await (await command).default(sock, msg, args)
        } catch (e) {
          console.error(e)
        }
      }
    } else if (text.toLowerCase() === 'hola' || text.toLowerCase() === 'bot' || text.toLowerCase() === 'luna') {
      sock.sendMessage(msg.key.remoteJid, { text: `¡Hola soy LunaBot! Mi creador es Tilin Ventas.` }, { quoted: msg })
    }
  })

  sock.ev.on('group-participants.update', async (update) => {
    if (update.action === 'add') {
      const metadata = await sock.groupMetadata(update.id)
      const participant = update.participants[0]
      const userName = participant.split('@')[0]
      const description = metadata.desc || 'Sin descripción.'
      const welcome = global.welcomeMessage(userName, metadata.subject, description)

      await sock.sendMessage(update.id, { text: welcome })

      // También manda el audio de bienvenida
      const audioPath = path.join(__dirname, './media/bienvenida.mp3')
      if (fs.existsSync(audioPath)) {
        const audio = fs.readFileSync(audioPath)
        await sock.sendMessage(update.id, { audio: audio, mimetype: 'audio/mp4' })
      }
    }
  })
}

loadPlugins()
export { start }
