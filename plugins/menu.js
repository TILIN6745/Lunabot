export default async function menu(sock, m, args) {
    let txt = `╭───⊷ *${global.botname}* ⊷───╮
│
├ ¡Hola! Soy *${global.botname}*.
├ Propietario: *${global.ownername}*
├ Instagram: ${global.instagram}
│
├ *Comandos disponibles:*
│
├ .menu
├ .dueño
├ .logo
├ .play (nombre)
├ .fb (link)
├ .ig (link)
├ .tiktok (link)
├ .audio (nombre)
│
╰───⊷ Únete a mi canal:
${global.canalwhatsapp}
`
    await sock.sendMessage(m.key.remoteJid, { text: txt }, { quoted: m })
}
