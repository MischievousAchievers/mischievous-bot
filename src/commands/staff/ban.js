const Discord = require('discord.js')
const config = require('../../../config.json');
module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    usage: '<user> [reason]',
    staff: true,
    async execute(message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You do not have permission to use this command.");
        const member = message.mentions.members.first();
        if (!member) return message.channel.send("Please tag someone to ban.");
        let reason = args.splice(1).join(' ');

        if (!reason) {
            reason = "None.";
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#00385C')
            .setTitle("Ban Notification")
            .addFields({
                name: "User Banned",
                value: `${member.user.tag}\n(${member.id})`,
                inline: true,
            }, {
                name: "Reason",
                value: reason,
                inline: true,
            }, {
                name: "Context",
                value: `[Click Me](${message.url} "Jump to message")`,
            })
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter(`Banned by ${message.author.tag}`)
            .setTimestamp();

        try {
            await message.guild.members.ban(member, {
                reason: reason,
            });
            await message.react('✅');

            const modLogChannel = await message.guild.channels.cache.get(config.modLogs);
            return modLogChannel.send(embed);
        } catch (e) {
            console.error(e);
        }
    }
}