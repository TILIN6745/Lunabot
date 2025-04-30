//═════════════════════════════════════════════//
//                CONFIGURACIÓN V10            //
//═════════════════════════════════════════════//

global.bot = {
  nombre: 'LunaBot',
  version: '10.0.0',
  lenguaje: 'es',
  autoread: true,
  antiborrado: true,
  autograbar: false,
  restrict: false,
  velocidad: '⚡', // Ej: ⚡ / 🚀 / 🐢
  logo: './media/logo.jpg',
  packname: 'LunaBot Stickers',
  author: 'Tilín Ventas',
  footer: '© LunaBot 2025 by Tilín'
}

global.owner = {
  numeros: ['528336105471'],
  nombre: 'Tilín Ventas',
  premium: true,
  contacto: {
    instagram: 'https://instagram.com/tilin.ff.23',
    canal: 'https://whatsapp.com/channel/0029VauK3kA4SpkPQyez1z00',
    github: 'https://github.com/TilinOficial'
  }
}

global.comandos = {
  prefijos: ['.', '/', '!'],
  respuesta: {
    exito: '✅ ¡Hecho!',
    error: '❌ Error, intenta más tarde',
    soloAdmin: '⚠️ Solo admins',
    soloOwner: '👑 Solo Tilín',
    soloGrupo: '👥 Solo en grupos',
    soloPrivado: '📩 Solo en privado',
    cargando: '⏳ Procesando...',
    premium: '💎 Comando solo para usuarios premium.'
  }
}

global.multimedia = {
  bienvenida: './media/bienvenida.jpg',
  despedida: './media/despedida.jpg',
  error: './media/error.jpg',
  audioDefault: './media/notif.mp3'
}

global.rpg = {
  iniciarVida: 100,
  iniciarDinero: 500,
  nivelBase: 1,
  multiplicadorXP: 75
}

global.api = {
  zenz: 'https://zenzapis.xyz',
  xteam: 'https://api.xteam.xyz',
  lolhuman: 'https://api.lolhuman.xyz'
}

global.keys = {
  'https://zenzapis.xyz': 'tu_clave_zenz',
  'https://api.xteam.xyz': 'tu_clave_xteam',
  'https://api.lolhuman.xyz': 'tu_clave_lol'
}

global.funciones = {
  registroObligatorio: true,
  economía: true,
  niveles: true,
  juegos: true,
  modoPublico: true,
  antiSpam: true,
  antiLink: true,
  inteligenciaArtificial: true
}

global.ai = {
  modelo: 'gpt-3.5-turbo',
  creador: 'Tilín Ventas',
  modoGrosero: true
}

global.database = {
  archivo: './database.json',
  autosave: true
}

global.estadisticas = {
  usuarios: 0,
  grupos: 0,
  comandosTotales: 150,
  fechaInicio: new Date()
}

module.exports = global
