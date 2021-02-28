const Discord = require('discord.js');

module.exports = {
    name: 'verify',
    description: 'Open a new ticket',
    async execute(message, args) {
        async function newTicket() {
            if (message.guild.channels.cache.some(channel => channel.name === "verify-" + message.author.id)) return message.channel.send(`${message.member} You already have a ticket open.`);
            const ticketName = `verify-${message.author.id}`;

            await message.guild.channels.create(ticketName, {
                type: 'text',
                permissionOverwrites: [
                    // Leader
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '811139995321630733',
                    },
                    // Moderator
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '811140029212524604',
                    },
                    // Bot
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '811120769836908574',
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: message.guild.id
                    }, {
                        allow: 'VIEW_CHANNEL',
                        id: message.author.id
                    },
                ]
            });

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}\'s Verification`)
                .setDescription("Please provide the information below.")
                .addFields({
                    name: "Question 1",
                    value: "What is your Matrix username?",
                }, {
                    name: "Question 2",
                    value: "Why do you want access to our voice channels?",
                })

            const ticketChannel = message.guild.channels.cache.find(ch => ch.name === ticketName);
            await ticketChannel.send(`<@${message.author.id}>`);
            ticketChannel.send(embed);

            message.channel.send(`<@${message.author.id}> <#${ticketChannel.id}>`);

        }
        message.delete();
        newTicket();
    }
}