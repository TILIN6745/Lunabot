// plugins/trivia.js
const questions = [
  { q: '¿Capital de Francia?', a: 'paris' },
  { q: '¿2 + 2 × 2 = ?', a: '6' },
  { q: '¿Lenguaje de programación con ñ?', a: 'ñava' },
  { q: '¿Planeta rojo?', a: 'marte' },
];
let triviaSessions = {};

export default async function trivia(sock, m, args) {
  const chat = m.key.remoteJid;
  if (!triviaSessions[chat] || args[0]==='start') {
    // iniciar
    const item = questions[Math.floor(Math.random()*questions.length)];
    triviaSessions[chat] = item;
    return sock.sendMessage(chat, { text: `❓ Trivia:\n${item.q}\n\nResponde con .trivia <respuesta>` }, { quoted: m });
  }
  const answer = args.join(' ').toLowerCase();
  const correct = triviaSessions[chat].a;
  delete triviaSessions[chat];
  if (answer === correct) {
    return sock.sendMessage(chat, { text: '✅ ¡Bien! Respuesta correcta.' }, { quoted: m });
  } else {
    return sock.sendMessage(chat, { text: `❌ Incorrecto. La respuesta era *${correct}*.` }, { quoted: m });
  }
}

export const command = ['trivia'];
export const group = false;
export const admin = false;
export const botAdmin = false;
