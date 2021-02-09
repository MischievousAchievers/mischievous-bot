const Discord = require('discord.js');

module.exports = {
    name: 'close',
    description: 'Close a ticket',
    async execute(message, args) {
        if (!message.channel.name.startsWith(`verify-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`confirm\`. This will time out in 10 seconds and be cancelled.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === 'confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then(() => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
}