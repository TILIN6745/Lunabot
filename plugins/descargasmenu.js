const handler = async (m, { conn, command, usedPrefix }) => {
  let text = `
╭━━━━〔 *🌐 MENÚ DE DESCARGAS* 〕━━━━⬣
┃
┃📥 _.play <texto o enlace>_
┃📥 _.play2 <texto o enlace>_
┃📥 _.playdoc <texto o enlace>_
┃📥 _.play3 <texto o enlace>_
┃📥 _.ytmp3 <link>_
┃📥 _.ytmp4 <link>_
┃📥 _.ytmp3doc <link>_
┃📥 _.ytmp4doc <link>_
┃📥 _.spotify <link>_
┃📥 _.mediafire <link>_
┃📥 _.instagram <link>_
┃📥 _.tiktok <link>_
┃📥 _.tiktoknowm <link>_
┃📥 _.facebook <link>_
┃📥 _.twitter <link>_
┃📥 _.pinterestdl <link>_
┃📥 _.soundcloud <link>_
┃📥 _.apk <nombre>_
┃📥 _.apkdone <nombre>_
┃📥 _.apkmody <nombre>_
┃📥 _.apkpure <nombre>_
┃📥 _.moddroid <nombre>_
┃📥 _.mediafire2 <link>_
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`.trim();

  conn.sendHydrated(m.chat, text, `LunaBot - Sistema de Descargas`, null, null, null, null, null, [
    ['Menú Principal', `${usedPrefix}menu`],
    ['Menú Completo', `${usedPrefix}menucompleto`]
  ], m);
};

handler.help = ['descargasmenu'];
handler.tags = ['menu'];
handler.command = /^(descargasmenu|menudescargas)$/i;

export default handler;
