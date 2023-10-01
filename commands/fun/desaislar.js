const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("desaislar")
    .setDescription("Desaislar a un miembro del servidor.")
    .addUserOption((option) =>
      option
        .setName("objetivo")
        .setDescription("El miembro que se desaislará.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options, guild } = interaction;
    const objetivo = options.getMember("objetivo");

    // Verificar si el miembro que ejecuta el comando tiene el rol "hablantes".
    const autor = interaction.member;
    const rolHablantes = guild.roles.cache.find(
      (rol) => rol.name === "hablantes"
    );

    if (!rolHablantes || !autor.roles.cache.has(rolHablantes.id)) {
      await interaction.reply({
        content:
          "Solo los miembros con el rol 'hablantes' pueden desaislar a otros miembros.",
        ephemeral: true,
      });
      return;
    }

    // Verificar si el miembro objetivo está aislado.
    if (!objetivo.timeout) {
      await interaction.reply({
        content: `${objetivo.displayName} no está aislado.`,
        ephemeral: true,
      });
      return;
    }

    // Desaislar al miembro.
    objetivo
      .timeout(0)
      .then(() => {
        interaction.reply({
          content: `Se desaisló a ${objetivo.displayName}.`,
          ephemeral: true,
        });
      })
      .catch((error) => {
        console.error(error);
        interaction.reply({
          content: "Ocurrió un error al desaislar al miembro.",
          ephemeral: true,
        });
      });
  },
};
