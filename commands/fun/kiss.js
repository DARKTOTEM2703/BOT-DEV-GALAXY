const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const DIG = require("discord-image-generation");
//const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
    .setName('beso')
    .setDescription('Manda un beso')
    .addUserOption(option => option.setName('user').setDescription('El usuario para dar un beso').setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getUser('user');
        const avatar = interaction.user.displayAvatarURL({ dynamic: false, size: 1024, extension: 'png' });
        const userAvatar = member.displayAvatarURL({ dynamic: false, size: 1024, extension: 'png' });
        const image = await new DIG.Kiss().getImage(avatar, userAvatar);
        const imageHug = await new DIG.Facepalm().getImage(avatar, userAvatar);
        let attachKiss = new AttachmentBuilder(image, { name: "kiss.png" });
        let attachHug = new AttachmentBuilder(imageHug, { name: "facepalm.png" });
        //const attach = new AttachmentBuilder(image, { name: "kiss.png" });
        const embedKiss = new EmbedBuilder()
            .setColor('#ff0000') // Color del embed (puedes cambiarlo a tu preferencia)
            .setDescription(`**${interaction.user.username}** ha besado a **${member.username}**`)
            .setImage('attachment://kiss.png'); // El nombre aquí debe coincidir con el nombre que le das a la imagen en `AttachmentBuilder`
        await interaction.reply({ files: [attachKiss], embeds: [embedKiss] })

        // Responder con el beso y el abrazo en una sola respuesta

        
        const embedHug = new EmbedBuilder()
            .setColor('#ff0000') // Color del embed (puedes cambiarlo a tu preferencia)
            .setDescription(`**${interaction.user.username}** ha abrazado a **${member.username}**`)
            .setImage('attachment://facepalm.png'); // El nombre aquí debe coincidir con el nombre que le das a la imagen en `AttachmentBuilder`
        //interaction.reply({ files: [attachKiss, attachHug], embeds: [embedKiss, embedHug] });
        await interaction.followUp({ files: [attachHug], embeds: [embedHug] })
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
        //await wait(2500);
        const preparandoMsg = await interaction.editReply(`:satellite: Preparando el comando, está dandole un beso...`);
        await preparandoMsg.react('💓');
        await preparandoMsg.react('2️⃣');
        await preparandoMsg.react('1️⃣');

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos

        await interaction.editReply({ content: `Beso dado` })
    },
};


// DOC
// reply envia una respuesta.
// editReply edita la respuesta.
// followUp envia una respuesta adicional a la ya enviada.
