const handler = async (m, { conn, command, usedPrefix }) => {
  let text = `
╭━━〔 *🛠️ MENÚ DE HERRAMIENTAS* 〕━━⬣
┃
┃🧰 _.afk <motivo>_
┃🧰 _.acortar <link>_
┃🧰 _.calc <operación>_
┃🧰 _.qr <texto>_
┃🧰 _.readmore <texto1|texto2>_
┃🧰 _.encuesta <texto>_
┃🧰 _.spamgp <texto>_
┃🧰 _.spamwa <número|texto|cantidad>_
┃🧰 _.readviewonce_
┃🧰 _.chatgpt | ia <texto>_
┃🧰 _.traducir <idioma> <texto>_
┃🧰 _.tts <idioma> <texto>_
┃🧰 _.horario_
┃🧰 _.delchat_
┃🧰 _.chatpdf_
┃🧰 _.pdf <enviar documento>_
┃🧰 _.inspect <link de grupo>_
┃🧰 _.imagen | dalle <texto>_
┃🧰 _.calendario_
┃🧰 _.whatmusic <responder audio>_
┃🧰 _.hd <responder imagen>_
┃🧰 _.ocr <responder imagen con texto>_
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`.trim();

  conn.sendHydrated(m.chat, text, `LunaBot - Herramientas Útiles`, null, null, null, null, null, [
    ['Menú Principal', `${usedPrefix}menu`],
    ['Menú Completo', `${usedPrefix}menucompleto`]
  ], m);
};

handler.help = ['herramientasmenu'];
handler.tags = ['menu'];
handler.command = /^(herramientasmenu)$/i;

export default handler;
