//══════════ LunaBot Oficial by Tilin Ventas ══════════//

// Datos principales
global.owner = ['+528336105471'] // Número del dueño en formato internacional
global.ownername = 'Tilin Ventas' // Nombre del dueño
global.botname = 'LunaBot Oficial' // Nombre del bot
global.instagram = 'https://instagram.com/tilin.ff.23' // Instagram del dueño
global.canalwhatsapp = 'https://whatsapp.com/channel/0029VauK3kA4SpkPQyez1z00' // Canal de WhatsApp

// Configuración
global.prefix = '.' // Prefijo de comandos
global.sessionName = 'lunabot' // Nombre de sesión
global.autoread = true // Auto-leer mensajes
global.antiprivado = false // El bot NO bloquea a quienes le hablen privado

// Mensajes por defecto
global.mess = {
    success: '✅ ¡Hecho!',
    admin: '❗ Este comando solo es para admins.',
    botAdmin: '❗ Necesito ser admin para ejecutar este comando.',
    owner: '❗ Este comando solo lo puede usar el dueño.',
    group: '❗ Este comando es solo para grupos.',
    private: '❗ Este comando es solo para privado.',
    bot: '❗ Esta función es solo para el bot.',
    wait: '⌛ Cargando, espera un momento...',
    error: '❗ Ocurrió un error, intenta más tarde.',
    endLimit: '❗ Se te acabó el límite diario, se renovará en 24 horas.'
}

// Bienvenida personalizada
global.welcomeMessage = (userName, groupName, description) => {
    return `¡Bienvenido/a ${userName} a *${groupName}*!
    
📄 *Descripción del grupo:*
${description}

Soy *${global.botname}*, creada por *${global.ownername}*.
¡Disfruta tu estancia!`
}

// Mensaje de despedida
global.byeMessage = (userName, groupName) => {
    return `👋 ${userName} ha salido del grupo *${groupName}*.
¡Le deseamos suerte!`
}

// Multimedia
global.logo = './media/logo.jpg' // Ruta del logo
global.thumb = './media/thumb.jpg' // Imagen miniatura por defecto

// Límite de comandos por usuario
global.limitawal = {
    premium: "Infinity", // Usuarios premium sin límites
    free: 25 // Usuarios normales 25 comandos diarios
}

// APIs (para música, stickers, etc.)
global.APIs = {
    zenz: 'https://zenzapis.xyz', 
}
global.APIKeys = {
    'https://zenzapis.xyz': 'TuApiKeyAquí', // Puedes registrarte en ZenzApi para conseguirla
}

// Configuración especial
global.rpg = {
    darahawal: 100,
    besiawal: 15,
    goldawal: 10,
    emeraldawal: 5,
    umpanawal: 5,
    potionawal: 1
}

//══════════ No tocar abajo si no sabes ══════════//

// Para que no explote si falta algo
global.fs = require('fs')
global.chalk = require('chalk')

console.log(chalk.greenBright('✅ LunaBot Oficial iniciado correctamente.'))
