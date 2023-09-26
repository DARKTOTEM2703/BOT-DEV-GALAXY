const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sorpresa')
		.setDescription('¡Da una sorpresa!'),
	async execute(interaction) {
		const sorpresaOptions = [
			'¡Sorpresa! 🎉',
			'¡Felicidades! 🥳',
			'¡Es tu día de suerte! 🌟',
			'¡Te enviamos amor y alegría! ❤️',
		];

		// Generar un índice aleatorio para seleccionar una sorpresa al azar
		const randomIndex = Math.floor(Math.random() * sorpresaOptions.length);
		const selectedSorpresa = sorpresaOptions[randomIndex];

		return interaction.reply(selectedSorpresa);
	},
};
