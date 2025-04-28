export default async function dueño(sock, m, args) {
    let txt = `╭───⊷ *Información del Dueño* ⊷───╮
│
├ Propietario: *${global.ownername}*
├ Número: wa.me/${global.owner[0]}
├ Instagram: ${global.instagram}
│
╰───⊷ *${global.botname}*`
    await sock.sendMessage(m.key.remoteJid, { text: txt }, { quoted: m })
}
