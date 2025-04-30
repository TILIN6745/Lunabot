const handler = async (m, { conn, usedPrefix, commands }) => {
let total = Object.values(commands).filter(v => v?.command).length
let texto = `
╭━━〔 *LunaBot Oficial* 〕━━⬣
┃ 𝙋𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤: Tilin Ventas
┃ 𝙉𝙪́𝙢𝙚𝙧𝙤: wa.me/528336105471
┃ 𝘾𝙖𝙣𝙖𝙡: https://whatsapp.com/channel/0029VauK3kA4SpkPQyez1z00
┃ 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝘁𝗼𝘁𝗮𝗹𝗲𝘀: ${total}
┃ 
┃ *Menú de Comandos:*
╰━━━━━━━━━━━━━━━━━━⬣

> *𝗜𝗡𝗙𝗢*
⤷ ${usedPrefix}ping
⤷ ${usedPrefix}infobot
⤷ ${usedPrefix}estado

> *𝗚𝗥𝗨𝗣𝗢𝗦*
⤷ ${usedPrefix}abrir / cerrar
⤷ ${usedPrefix}grupo info
⤷ ${usedPrefix}link
⤷ ${usedPrefix}promote / demote
⤷ ${usedPrefix}add / kick

> *𝗔𝗡𝗧𝗜𝗦 & 𝗔𝗨𝗧𝗢𝗠𝗢𝗗𝗘𝗥𝗔𝗖𝗜𝗢́𝗡*
⤷ ${usedPrefix}antilink on/off
⤷ ${usedPrefix}antiprivado on/off
⤷ ${usedPrefix}detect on/off

> *𝗠𝗨𝗟𝗧𝗜𝗠𝗘𝗗𝗜𝗔*
⤷ ${usedPrefix}play <texto>
⤷ ${usedPrefix}ytmp3 <url>
⤷ ${usedPrefix}ytmp4 <url>
⤷ ${usedPrefix}tiktok <url>
⤷ ${usedPrefix}sticker / toimg

> *𝗔𝗨𝗗𝗜𝗢𝗦*
⤷ ${usedPrefix}menuaudio
(Audios personalizados)

> *𝗠𝗘𝗡𝗨 +18*  
⤷ ${usedPrefix}menu18  
(NSFW +18 para admins)

> *𝗢𝗧𝗥𝗢𝗦*
⤷ ${usedPrefix}donar
⤷ ${usedPrefix}owner
⤷ ${usedPrefix}reportar <texto>

╭─〔 *Gracias por usar LunaBot* 〕─⬣
┃ Usa ${usedPrefix}reportar para sugerencias.
╰━━━━━━━━━━━━━━━━━━━━━━⬣
`.trim()

await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}
handler.command = ['menu']
export default handler
