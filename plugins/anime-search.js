// plugins/anime-search.js
import fetch from 'node-fetch';

let handler = async (m, { text, command }) => {
  if (!text) throw `Escribe el nombre de un anime\nEjemplo: .anime Naruto`;

  let res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`);
  let json = await res.json();

  if (!json.data || !json.data.length) throw 'Anime no encontrado.';

  let anime = json.data[0];
  let caption = `
*📺 Título:* ${anime.title}
*🆎 Japonés:* ${anime.title_japanese}
*✍️ Tipo:* ${anime.type}
*📅 Emisión:* ${anime.aired.string}
*📊 Score:* ${anime.score || 'N/A'}
*🔞 Clasificación:* ${anime.rating || 'N/A'}
*📝 Sinopsis:* ${anime.synopsis?.split('\n')[0] || 'Sin sinopsis.'}

🔗 *Más info:* ${anime.url}
  `.trim();

  await m.reply(caption);
};

handler.help = ['anime <nombre>'];
handler.tags = ['anime'];
handler.command = /^anime$/i;

export default handler;
