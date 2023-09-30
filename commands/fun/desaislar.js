const { SlashCommandBuilder, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('desaislar')
    .setDescription('Quitar el aislamiento temporal de un miembro.')
    .addUserOption(option =>
      option
        .setName('objetivo')
        .setDescription('El miembro al que se le quitará el aislamiento.')
        .setRequired(true)),
  async execute(interaction) {
    const { options, guild } = interaction;
    const objetivo = options.getMember('objetivo');

    // Verificar si el miembro que ejecuta el comando tiene permisos de Banear Miembros.
    const autor = interaction.member;
    if (!autor.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      await interaction.reply({ content: 'No tienes permisos para quitar el aislamiento a un miembro.', ephemeral: true });
      return;
    }

    // Intentar desaislar al miembro objetivo utilizando el ID del usuario.
    try {
      await guild.members.unban(objetivo.user.id);
      interaction.reply({ content: `Se quitó el aislamiento de ${objetivo.displayName}.`, ephemeral: false });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Ocurrió un error al quitar el aislamiento del miembro.', ephemeral: false });
    }
  },
};
