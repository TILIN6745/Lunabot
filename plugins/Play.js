import ytdl from 'ytdl-core'
import yts from 'yt-search'

export default async function play(sock, m, args) {
    if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Escribe el nombre de la canción.' }, { quoted: m })

    const search = await yts(args.join(' '))
    const video = search.videos[0]

    if (!video) return sock.sendMessage(m.key.remoteJid, { text: 'No encontré resultados.' }, { quoted: m })

    let url = video.url
    const audioStream = ytdl(url, { filter: 'audioonly' })

    await sock.sendMessage(m.key.remoteJid, { audio: audioStream, mimetype: 'audio/mp4' }, { quoted: m })
}
