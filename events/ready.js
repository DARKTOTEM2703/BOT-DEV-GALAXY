const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

// // Escucha el evento 'ready' cuando el bot está listo
// client.once('ready', () => {
//     console.log(`Logged in as ${client.user.tag}`);
// });
