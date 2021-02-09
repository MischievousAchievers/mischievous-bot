const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'avatar',
    description: 'Displays user\'s avatar',
    aliases: ['av', 'pfp'],
    usage: '[user]',
    execute(message) {

        let member = message.mentions.users.first();
        const embed = new Discord.MessageEmbed()
            .setColor('#00385C')

        if (member) {
            embed.setTitle(`${member.username}\'s Avatar`)
            embed.setImage(member.displayAvatarURL({
                dynamic: true,
                size: 256
            }))
        } else {
            embed.setTitle(`${message.author.username}\'s Avatar`)
            embed.setImage(message.author.displayAvatarURL({
                dynamic: true,
                size: 256
            }))
        }
        return message.channel.send(embed);

    }
}