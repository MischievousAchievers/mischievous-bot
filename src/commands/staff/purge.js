module.exports = {
    name: 'purge',
    description: 'Purge a bunch of messages',
    staff: true,
    execute(message, args) {

        if (!message.member.roles.cache.some(r => ["Leader", "Moderator"].includes(r.name))) return;


        const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.channel.send('That doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.channel.send('You need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to purge messages in this channel!');
		});
    }
}