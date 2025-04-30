let handler = async (m, { conn, args, command, usedPrefix }) => {
  const user = global.db.data.users[m.sender];

  if (command === 'registrar') {
    if (user.registered) return m.reply('Ya estás registrado.');

    if (args.length < 2) return m.reply(`Uso correcto:\n*${usedPrefix}registrar <nombre> <edad>*\nEjemplo: ${usedPrefix}registrar Tilín 24`);

    const nombre = args[0];
    const edad = parseInt(args[1]);

    if (!nombre || isNaN(edad)) return m.reply('Nombre o edad inválida.');
    if (edad < 10 || edad > 99) return m.reply('Edad no válida. Debe ser entre 10 y 99.');

    user.name = nombre;
    user.age = edad;
    user.exp = 100;
    user.money = 1000;
    user.registered = true;

    m.reply(`✅ Registro completo:\n\nNombre: ${nombre}\nEdad: ${edad}\nBonificación: 1000 monedas y 100 XP`);
  }

  if (command === 'perfil') {
    if (!user.registered) return m.reply(`No estás registrado.\nUsa: *${usedPrefix}registrar Tilín 24*`);
    
    m.reply(`*Tu Perfil:*\n\nNombre: ${user.name}\nEdad: ${user.age}\nMonedas: ${user.money}\nXP: ${user.exp}`);
  }
};

handler.command = ['registrar', 'perfil'];
export default handler;
