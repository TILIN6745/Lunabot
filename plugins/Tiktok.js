import fetch from 'node-fetch'

export default async function tiktok(sock, m, args) {
    if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Escribe el link de TikTok.' }, { quoted: m })

    let res = await fetch(`https://api.lolhuman.xyz/api/tiktoknowm?apikey=TuApiKeyLol&url=${args[0]}`)
    let json = await res.json()

    if (json.status !== 200) return sock.sendMessage(m.key.remoteJid, { text: 'Error al descargar el video.' }, { quoted: m })

    await sock.sendMessage(m.key.remoteJid, { video: { url: json.result.link } }, { quoted: m })
}
