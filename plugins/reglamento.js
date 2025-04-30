const handler = async (m) => {
  let texto = `
📜 *REGLAMENTO FREE FIRE* 📜

1. No se permite el uso de hacks.
2. Respetar a todos los jugadores.
3. Partida que se caiga, se repite solo si es fallo general.
4. El organizador tiene la última palabra.

Disfruta y compite limpiamente.
`;
  m.reply(texto);
};

handler.command = /^reglamentoff$/i;
handler.group = true;
export default handler;
