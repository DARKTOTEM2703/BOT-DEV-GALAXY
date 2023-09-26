const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('muteall')
    .setDescription('Mutea a todos los miembros en un canal de voz, excepto el rol de STAFF')
    .addChannelOption((option) =>
      option.setName('canal')
        .setDescription('El canal de voz en el que se aplicará el mute')
        .setRequired(true)
    ),
  async execute(interaction) {
    const channelOption = interaction.options.getChannel('canal');

    if (!channelOption || channelOption.type !== ChannelType.GuildVoice) {
      return interaction.reply('Debes especificar un canal de voz válido.');
    }

    // Obtén el rol de STAFF (ajusta el nombre del rol según sea necesario)
    const staffRole = interaction.guild.roles.cache.find((r) => r.name === 'hablantes');

    if (!staffRole) {
      return interaction.reply('El rol de hablantes no se encontró en el servidor.');
    }

    const voiceChannel = channelOption;
    const membersInChannel = voiceChannel.members;

    membersInChannel.forEach(async (member) => {
      // Verifica si el miembro tiene el rol de STAFF
      if (!member.roles.cache.has(staffRole.id)) {
        try {
          await member.voice.setMute(true);
        } catch (error) {
          console.error(error);
        }
      }
    });

    return interaction.reply(`Muteados todos los miembros en el canal de voz "${voiceChannel.name}", excepto el rol de hablantes.`);
  },
};
