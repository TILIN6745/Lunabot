export default async function tagall(sock, m, args) {
  const grupo = await sock.groupMetadata(m.chat);
  const participantes = grupo.participants.map(u => u.id);

  let mensaje = `╭━━━━〔 *${global.botName || 'LunaBot'} — TAGALL* 〕━━━━⬣\n`;
  mensaje += `┃  *Nombre del grupo:* ${grupo.subject}\n`;
  mensaje += `┃  *Integrantes:* ${participantes.length}\n`;
  mensaje += `┃\n`;

  for (const id of participantes) {
    mensaje += `┃  ✦ @${id.split('@')[0]}\n`;
  }

  mensaje += `╰━━━━━━━━━━━━━━━━━━━━⬣`;

  await sock.sendMessage(m.chat, { text: mensaje, mentions: participantes }, { quoted: m });
}
