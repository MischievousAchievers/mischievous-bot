const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Get the user info of a player',
    async execute(message, args) {

        const member = message.mentions.members.first();

        const embed = new Discord.MessageEmbed()

        if (member) {

            const d = new Date(member.user.createdAt).toString();
            const d1 = new Date(member.joinedTimestamp).toString();
    
            const d2 = d.split(' ')
            const d3 = d1.split(' ')

            embed
            .setDescription(member)
            .setTitle(`User Info: ${member.user.tag}`)
            .addFields({
                name: 'Account Registered',
                value: `${d2[1]} ${d2[2]} ${d2[3]} at ${d2[4]}`,
                inline: true,
            }, {
                name: 'Account Joined',
                value: `${d3[1]} ${d3[2]} ${d3[3]} at ${d3[4]}`,
                inline: true,
            })
            .setFooter(`ID: ${member.user.id}`)
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 256
            }))
            .setTimestamp();
        
        return message.channel.send(embed);

        } else {

            const d = new Date(message.member.user.createdAt).toString();
            const d1 = new Date(message.member.joinedTimestamp).toString();
    
            const d2 = d.split(' ')
            const d3 = d1.split(' ')
    
    
            embed
                .setDescription(message.member)
                .setTitle(`User Info: ${message.member.user.tag}`)
                .addFields({
                    name: 'Account Registered',
                    value: `${d2[1]} ${d2[2]} ${d2[3]} at ${d2[4]}`,
                    inline: true,
                }, {
                    name: 'Account Joined',
                    value: `${d3[1]} ${d3[2]} ${d3[3]} at ${d3[4]}`,
                    inline: true,
                })
                .setFooter(`ID: ${message.member.user.id}`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    size: 256
                }))
                .setTimestamp();
            
            return message.channel.send(embed);

        }


        const newDate = date2.toString();

        console.log(newDate)

    }
}