import fs from 'fs'

export default async function logo(sock, m, args) {
    const logo = fs.readFileSync(global.logo)
    await sock.sendMessage(m.key.remoteJid, { image: logo, caption: `${global.botname} Oficial` }, { quoted: m })
}
