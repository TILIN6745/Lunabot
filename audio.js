import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async function audio(sock, m, args) {
    if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Escribe el nombre del audio.' }, { quoted: m })
    const audioName = args.join(' ').toLowerCase() + '.mp3'
    const audioPath = path.join(__dirname, '../media/audios', audioName)

    if (fs.existsSync(audioPath)) {
        const audio = fs.readFileSync(audioPath)
        await sock.sendMessage(m.key.remoteJid, { audio: audio, mimetype: 'audio/mp4' }, { quoted: m })
    } else {
        await sock.sendMessage(m.key.remoteJid, { text: 'No encontré ese audio.' }, { quoted: m })
    }
}
