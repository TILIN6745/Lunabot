export default {
  name: 'menu',
  alias: ['menú', 'help', 'ayuda'],
  description: 'Muestra el menú principal del bot',
  run: async (sock, m) => {
    const nombreBot = global.botName || 'LunaBot';
    const nombreUsuario = m.pushName || 'Amigo';
    const fecha = new Date().toLocaleDateString('es-MX', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const menu = `
╭━━━『 *${nombreBot}* 』━━━⬣
┃ ✦ Hola, ${nombreUsuario}
┃ ✦ Fecha: ${fecha}
┃ ✦ Bot en línea
╰━━━━━━━━━━━━━━━━━⬣

╭━━━『 *INFORMACIÓN* 』━━━⬣
┃ ➥ .estado
┃ ➥ .ping
┃ ➥ .grupos
┃ ➥ .infobot
╰━━━━━━━━━━━━━━━━⬣

╭━━━『 *CREADOR* 』━━━⬣
┃ ➥ .menu
┃ ➥ .owner
┃ ➥ .donar
╰━━━━━━━━━━━━━━━━⬣

╭━━━『 *CONFIGURACIÓN* 』━━━⬣
┃ ➥ .welcome on/off
┃ ➥ .autonivel on/off
┃ ➥ .antilink on/off
┃ ➥ .modoadmin on/off
╰━━━━━━━━━━━━━━━━⬣

╭━━━『 *JUEGOS* 』━━━⬣
┃ ➥ .ppt (piedra, papel o tijeras)
┃ ➥ .adivinanza
┃ ➥ .riddle
┃ ➥ .math (modo difícil)
╰━━━━━━━━━━━━━━━━⬣

╭━━━『 *DESCARGAS* 』━━━⬣
┃ ➥ .play (nombre o link)
┃ ➥ .ytmp3 (link)
┃ ➥ .ytmp4 (link)
┃ ➥ .tiktok (link)
╰━━━━━━━━━━━━━━━━⬣

╭━━━『 *DIVERSIÓN* 』━━━⬣
┃ ➥ .tagall
┃ ➥ .todos
┃ ➥ .notify (mensaje)
┃ ➥ .stickermenu
╰━━━━━━━━━━━━━━━━⬣

╭━━━『 *UTILIDADES* 』━━━⬣
┃ ➥ .clima (ciudad)
┃ ➥ .traducir (texto)
┃ ➥ .calculadora (expresión)
╰━━━━━━━━━━━━━━━━⬣

╭━━━━『 *FIN DEL MENÚ* 』━━━━⬣
┃ Gracias por usar *${nombreBot}*
╰━━━━━━━━━━━━━━━━━━━━⬣
    `.trim();

    await sock.sendMessage(m.chat, { text: menu }, { quoted: m });
  }
}
