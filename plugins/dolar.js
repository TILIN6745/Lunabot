import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m) => {
  try {
    const res = await fetch('https://www.google.com/search?q=precio+del+dolar+en+mexico')
    const html = await res.text()
    const $ = cheerio.load(html)

    const valor = $('span.DFlfde.SwHCTb').first().text()
    if (!valor) throw 'No pude obtener el valor del dólar.'

    let mensaje = `*💵 Precio del Dólar (MXN):* $${valor} pesos mexicanos.`
    m.reply(mensaje)
  } catch {
    throw 'Error al obtener el valor del dólar. Intenta más tarde.'
  }
}

handler.help = ['dolar']
handler.tags = ['economia']
handler.command = /^dolar$/i

export default handler
