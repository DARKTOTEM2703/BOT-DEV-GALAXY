const { Events, EmbedBuilder } = require('discord.js');
const settings = require('../settings');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		if (!settings.canalLogEntradas) return;

		let canal = member.guild.channels.cache.get(settings.canalLogEntradas);
        if (!canal) {
            console.log(`El canal con ID ${settings.canalLogEntradas} no fue encontrado en alguno de los servidores.`);
            return;
        }

		let embed = new EmbedBuilder()
		.setColor("Green")
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
		.setTitle(`👋 ¡Bienvenido ${member.user.username}!`)
		.setDescription(`> Hola ${member}!\nBienvenido(a) al servidor \`${member.guild.name}\`!\nActualmente somos \`${member.guild.memberCount}\` miembros.`)
		.setImage('https://th.bing.com/th/id/OIP.9elAbno9mImk84-HtspWoAHaFX?pid=ImgDet&rs=1');
		canal.send({ embeds: [embed], content: `${member}` })
            .catch(error => console.error(`Error al enviar el mensaje: ${error}`));
	}
};


// DOC
// Proteger ` dentro de un String con \ -> \`
// Pasar MessageEmbed (ChatGPT - Discord.js 13) a EmbedBuilder (Discord.js 14)
// Todo lo que sea en mayusculas por ejemplo MANAGE_ROLES es de discord.js 13. -> PermissionFlagsBits.ManageRoles