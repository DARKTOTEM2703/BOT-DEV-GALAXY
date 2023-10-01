const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aislar")
    .setDescription("Aislar a un miembro del servidor.")
    .addUserOption((option) =>
      option
        .setName("objetivo")
        .setDescription("El miembro que se aislará.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tiempo")
        .setDescription("Seleccione el tiempo de aislamiento")
        .addChoices(
          { name: "1 hora", value: "1h" },
          { name: "6 horas", value: "6h" },
          { name: "12 horas", value: "12h" },
          { name: "24 horas", value: "24h" },
          { name: "48 horas", value: "48h" },
          { name: "Tiempo personalizado", value: "custom" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("tiempo_personalizado")
        .setDescription("Introduzca el tiempo de aislamiento a mano")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("razon").setDescription("La razón del aislamiento")
    )
    //.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  async execute(interaction) {
    const { options, user, guild } = interaction;
    const objetivo = options.getMember("objetivo");
    const tiempo = options.getString("tiempo");
    const tiempoPersonalizado = options.getString("tiempo_personalizado");
    const razon = options.getString("razon");

    // Verificar si el miembro que ejecuta el comando tiene permisos suficientes para aislar a otro miembro.
    const autor = interaction.member;
    if (!autor.permissions.has(PermissionFlagsBits.BanMembers)) {
      await interaction.reply({
        content: "No tienes permisos para aislar a un miembro.",
        ephemeral: true,
      });
      return;
    }

    // Obtener el miembro objetivo del servidor.
    const miembroObjetivo = guild.members.cache.get(objetivo.id);

    // Calcular el tiempo en milisegundos.
    let tiempoEnMilisegundos;
    if (tiempo === "custom" && tiempoPersonalizado) {
      tiempoEnMilisegundos = parseInt(tiempoPersonalizado) * 1000;
    } else {
      tiempoEnMilisegundos = parseTiempo(tiempo);
    }

    // Aplicar el aislamiento utilizando el método de timeout de la API.
    miembroObjetivo
      .timeout(tiempoEnMilisegundos, razon || "Sin razón especificada")
      .then(() => {
        interaction.reply({
          content: `Se aisló temporalmente a ${miembroObjetivo.displayName} durante ${tiempo}.`,
          ephemeral: true,
        });
      })
      .catch((error) => {
        console.error(error);
        interaction.reply({
          content: "Ocurrió un error al aislar al miembro.",
          ephemeral: true,
        });
      });
  },
};

function parseTiempo(tiempo) {
  switch (tiempo) {
    case "1h":
      return 3600000; // 1 hora en milisegundos
    case "6h":
      return 21600000; // 6 horas en milisegundos
    case "12h":
      return 43200000; // 12 horas en milisegundos
    case "24h":
      return 86400000; // 24 horas en milisegundos
    case "48h":
      return 172800000; // 48 horas en milisegundos
    default:
      return 0;
  }
}
