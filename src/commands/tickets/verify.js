const Discord = require('discord.js');

module.exports = {
    name: 'verify',
    description: 'Open a new ticket',
    async execute(message, args) {
        async function newTicket() {
            if (message.guild.channels.cache.some(channel => channel.name === "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
            const ticketName = `verify-${message.author.id}`;

            await message.guild.channels.create(ticketName, {
                type: 'text',
                permissionOverwrites: [{
                        allow: 'VIEW_CHANNEL',
                        id: message.author.id
                    },
                    // Leader
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '800678192268312606',
                    },
                    // Moderator
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '802659259300053003',
                    },
                    // Bot
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '799108249205997599',
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: message.guild.id
                    }
                ]
            });

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}\'s Ticket`)
                .setDescription("Hello! Please provide a screenshot of a your hacked client (with your username visible in the same screenshot) and a photo of you MC Launcher or proof that you are verified in another sublegion to be verified!")

            const ticketChannel = message.guild.channels.cache.find(ch => ch.name === ticketName);
            ticketChannel.send(embed);

            message.channel.send(`<@${message.author.id}> <#${ticketChannel.id}>`);

        }
        newTicket();
    }
}