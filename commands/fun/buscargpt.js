const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios"); // Importa la biblioteca axios

module.exports = {
  data: new SlashCommandBuilder()
    .setName("BuscarGpt")
    .setDescription("Interactúa con ChatGPT 3.5"),
  async execute(interaction) {
    // Aquí puedes hacer una solicitud a la API de ChatGPT
    const apiUrl = "org-uuqlF7fqkhhqahQSgreod9Yy"; // Reemplaza con la URL de tu API de ChatGPT
    const apiKey = "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"; // Reemplaza con tu clave de API de ChatGPT

    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: "Pregunta o texto que deseas enviar a ChatGPT",
          max_tokens: 50, // Número máximo de tokens en la respuesta
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // En este punto, response.data contiene la respuesta de ChatGPT
      const chatResponse = response.data.choices[0].text;

      return interaction.reply(chatResponse);
    } catch (error) {
      console.error(error);
      return interaction.reply("Hubo un error al conectarse a ChatGPT.");
    }
  },
};
