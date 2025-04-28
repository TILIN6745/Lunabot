export default async function menu(sock, m, args) {
  const nombreBot = global.botName || 'LunaBot';
  const nombreUsuario = m.pushName || 'Usuario';
  const fecha = new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const menu = `
╭══🎀 *${nombreBot} - MENÚ PRINCIPAL* 🎀══⬣
┃
┃  *Hola:* ${nombreUsuario}
┃  *Fecha:* ${fecha}
┃
┃  📚 *INFORMACIÓN*
┃   ➥ .estado
┃   ➥ .ping
┃   ➥ .grupos
┃
┃  ✨ *CREADOR*
┃   ➥ .menu
┃   ➥ .owner
┃   ➥ .donar
┃
┃  ⚙️ *CONFIGURACIÓN*
┃   ➥ .welcome on/off
┃   ➥ .autonivel on/off
┃   ➥ .antilink on/off
┃
┃  🎮 *JUEGOS*
┃   ➥ .ppt (piedra, papel, tijeras)
┃   ➥ .adivinanza
┃   ➥ .riddle
┃
┃  ⚡ *DESCARGAS*
┃   ➥ .play (nombre)
┃   ➥ .ytmp3 (link)
┃   ➥ .ytmp4 (link)
┃
┃  ❤️ *DIVERSIÓN*
┃   ➥ .tagall
┃   ➥ .notify (mensaje)
┃
╰═══════≪ *${nombreBot}* ≫═══════⬣
`;

  await sock.sendMessage(m.chat, { text: menu }, { quoted: m });
}
