import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import cfonts from 'cfonts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mainBot = path.join(__dirname, 'luna.js');

function iniciarBot(file) {
  cfonts.say('LunaBot Oficial', {
    font: 'block',
    align: 'center',
    gradient: ['blue', 'cyan'],
    transitionGradient: true,
  });

  cfonts.say('By Tilín Ventas', {
    font: 'console',
    align: 'center',
    colors: ['blueBright'],
  });

  const args = [file, ...process.argv.slice(2)];
  const proceso = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });

  proceso.on('message', (mensaje) => {
    console.log('[ BOT DICE ]', mensaje);
    if (mensaje === 'reset') {
      console.log('[ SISTEMA ] Reiniciando bot automáticamente...');
      proceso.kill('SIGTERM');
      iniciarBot(file);
    }
  });

  proceso.on('exit', (code) => {
    console.error(`[ ERROR ] El bot se cerró con código: ${code}`);
    if (code !== 0) {
      console.log('[ SISTEMA ] Reiniciando bot tras error...');
      iniciarBot(file);
    }
  });

  proceso.on('error', (err) => {
    console.error('[ ERROR CRÍTICO ]', err);
    iniciarBot(file);
  });
}

iniciarBot(mainBot);
