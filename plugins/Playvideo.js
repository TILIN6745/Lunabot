const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ Ejemplo de uso:\n${usedPrefix + command} karol g mañana será bonito | 720p`;

  let [query, quality] = text.split('|').map(v => v.trim());
  if (!quality) quality = '360p';

  m.reply(`⏳ Buscando *${query}* en YouTube...`);

  try {
    let search = await axios.get(`https://vihangayt.me/tools/ytsearch?query=${encodeURIComponent(query)}`);
    let video = search.data.data[0];
    if (!video) throw '❌ No se encontró ningún resultado.';

    let info = await axios.get(`https://vihangayt.me/download/ytmp4?url=${video.url}`);
    let results = info.data.data;

    let foundQuality = results.filter(v => v.quality.toLowerCase() === quality.toLowerCase())[0];
    if (!foundQuality) {
      let available = results.map(v => v.quality).join(', ');
      throw `⚠️ Calidad *${quality}* no disponible.\nCalidades disponibles: ${available}`;
    }

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      caption: `*Título:* ${video.title}\n*Duración:* ${video.duration}\n*Publicado:* ${video.published}\n*Calidad:* ${foundQuality.quality}\n\nDescargando...`,
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      video: { url: foundQuality.url },
      mimetype: 'video/mp4',
      fileName: `${video.title} - ${foundQuality.quality}.mp4`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    throw typeof e === 'string' ? e : '⚠️ Error al descargar el video.';
  }
};

handler.help = ['playvideo <nombre> | <calidad>'];
handler.tags = ['downloader'];
handler.command = /^playvideo$/i;

module.exports = handler;
