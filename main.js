import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import cfonts from 'cfonts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mainBot = path.join(__dirname, 'luna.js');

function startBot(file) {
  cfonts.say('LunaBot Oficial', {
    font: 'block',
    align: 'center',
    gradient: ['blue', 'cyan'],
    transitionGradient: true,
  });

  cfonts.say('Bot creado por Tilín Ventas', {
    font: 'console',
    align: 'center',
    colors: ['blueBright'],
  });

  const args = [file, ...process.argv.slice(2)];
  const p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });

  p.on('close', (code) => {
    console.log(`[ SISTEMA ] El proceso terminó con código: ${code}`);
    if (code === 0) {
      startBot(file);
    } else {
      console.error('[ ERROR ] Ocurrió un fallo inesperado.');
    }
  });

  p.on('message', (msg) => {
    console.log('[ MENSAJE DEL BOT ]', msg);
    if (msg === 'reset') {
      p.kill('SIGTERM');
      startBot(file);
    }
  });
}

startBot(mainBot);
