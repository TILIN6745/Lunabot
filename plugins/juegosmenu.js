const handler = async (m, { conn, command, usedPrefix }) => {
  let text = `
╭━━〔 *🎮 MENÚ DE JUEGOS DINÁMICOS* 〕━━⬣
┃
┃🎲 _.mates <operación matemática>_
┃🎲 _.ppt <piedra/papel/tijera>_
┃🎲 _.prostituto | prostituta_
┃🎲 _.love | ship <@tag> <@tag>_
┃🎲 _.formarpareja_
┃🎲 _.dado_
┃🎲 _.gay | lesbiana | maricon_
┃🎲 _.simi | simi2 <texto>_
┃🎲 _.reto_
┃🎲 _.verdad_
┃🎲 _.pajazo_
┃🎲 _.topgays | topotakus_
┃🎲 _.slot_
┃🎲 _.adivinanza_
┃🎲 _.suerte_
┃🎲 _.pregunta_
┃🎲 _.fakechat_
┃🎲 _.minibio_
┃🎲 _.catakiz_
┃🎲 _.cristianogay_
┃🎲 _.soypro_
┃🎲 _.ahorcado_
┃🎲 _.tictactoe @usuario_
┃🎲 _.delttt_
┃🎲 _.doxear @usuario_
┃🎲 _.preguntastxt_
┃🎲 _.retoxtxt_
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`.trim();

  conn.sendHydrated(m.chat, text, `LunaBot - Zona de Juegos`, null, null, null, null, null, [
    ['Menú Principal', `${usedPrefix}menu`],
    ['Menú Completo', `${usedPrefix}menucompleto`]
  ], m);
};

handler.help = ['juegosmenu'];
handler.tags = ['menu'];
handler.command = /^(juegosmenu)$/i;

export default handler;
