const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ Ejemplo de uso: *${usedPrefix + command} Nombre de la canción*`;

  m.reply('⏳ Buscando la canción, espera un momento...');

  try {
    let search = await axios.get(`https://vihangayt.me/tools/ytsearch?query=${encodeURIComponent(text)}`);
    let video = search.data.data[0];

    if (!video || !video.url) throw '❌ No se encontró el audio.';

    let info = await axios.get(`https://vihangayt.me/download/ytmp3?url=${video.url}`);
    let result = info.data.data;

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      caption: `*Título:* ${video.title}\n*Duración:* ${video.duration}\n\nDescargando audio...`,
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: result.url },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    throw '⚠️ Error al obtener la canción. Intenta con otro título.';
  }
};

handler.help = ['play'].map(v => v + ' <texto>');
handler.tags = ['downloader'];
handler.command = /^play$/i;

module.exports = handler;
