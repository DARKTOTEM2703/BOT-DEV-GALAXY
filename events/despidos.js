const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberRemove,
	async execute(member) {
		// Reemplaza 'CANAL_DE_DESPEDIDA_ID' con el ID del canal de despedida
		const channel = member.guild.channels.cache.get('1155168519575580763');

		if (!channel) return;

		// Envía un mensaje de despedida
		channel.send(`Adiós, ${member.user.tag}. Esperamos verte pronto.`);
	},
};