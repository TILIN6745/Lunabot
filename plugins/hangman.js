// plugins/hangman.js
const words = ['javascript','whatsapp','nodejs','programacion','chatbot','luna','bot'];
let sessions = {};

export default async function hangman(sock, m, args) {
  const chat = m.key.remoteJid;
  if (!sessions[chat] || args[0]==='start') {
    // Iniciar nueva partida
    const word = words[Math.floor(Math.random()*words.length)];
    sessions[chat] = {
      word,
      guessed: Array(word.length).fill('_'),
      tries: 6
    };
    return sock.sendMessage(chat, { text: 
      `🔤 Ahorcado iniciado!\n`+
      `Palabra: ${sessions[chat].guessed.join(' ')}\n`+
      `Intentos restantes: ${sessions[chat].tries}\n`+
      `Usa .hangman <letra> para adivinar.` 
    }, { quoted: m });
  }
  // Ya hay partida
  const s = sessions[chat];
  const letter = args[0]?.toLowerCase();
  if (!letter || letter.length!==1) return sock.sendMessage(chat, { text: '✏️ Escribe una sola letra: .hangman a' }, { quoted: m });
  if (s.guessed.includes(letter) || !/[a-z]/.test(letter)) {
    return sock.sendMessage(chat, { text: '❌ Letra inválida o ya usada.' }, { quoted: m });
  }
  let hit = false;
  for (let i=0; i<s.word.length; i++){
    if (s.word[i]===letter) { s.guessed[i]=letter; hit = true; }
  }
  if (!hit) s.tries--;
  // Fin de partida?
  if (s.guessed.join('')===s.word) {
    delete sessions[chat];
    return sock.sendMessage(chat, { text: `🎉 ¡Ganaste! La palabra era *${s.word}*.` }, { quoted: m });
  }
  if (s.tries===0) {
    const w=s.word;
    delete sessions[chat];
    return sock.sendMessage(chat, { text: `💀 ¡Perdiste! La palabra era *${w}*.` }, { quoted: m });
  }
  // Estado intermedio
  return sock.sendMessage(chat, { text: 
    `Palabra: ${s.guessed.join(' ')}\n`+
    `Intentos restantes: ${s.tries}` 
  }, { quoted: m });
}

export const command = ['hangman'];
export const group = false;
export const admin = false;
export const botAdmin = false;
