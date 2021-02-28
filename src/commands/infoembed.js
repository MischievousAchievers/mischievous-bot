const Discord = require('discord.js');

module.exports = {
    name: 'infoembed',
    description: 'Sends info embed',
    aliases: ['ie'],
    hide: true,
    execute(message, args) {
        message.delete();
        if (message.author.id !== '811003233165115423') return;

        const embed = new Discord.MessageEmbed()
        .setTitle("Rules & Information")
        .setDescription("Welcome to the MA Voice Chat Discord server. Please read all of the information below.")
        .addFields({
            name: 'General Server Rules',
            value: '1. Be respectful when in voice chat. No bigotry, racism, homophobia, etc.\n2. Use common sense.\n3. Abide by the Discord TOS.\n4. Abide by the rules found in our Matrix community (see below).\n\nThese rules are subject to change and I reserve the right to punish anyone for any reason I see fit.'
        }, {
            name: 'Matrix Community',
            value: 'This Discord is not our main community. We only use this server for voice chatting. Make sure to join our [Matrix community](https://matrix.to/#/+mischievous-achievers:matrix.org).'
        }, {
            name: 'Voice Channel Access',
            value: 'In order to be able to use our voice channels, you must be in our Matrix community (see above). Once you\'ve registered and joined, go to <#811003528373993515> and do \`>verify\`. Follow the instructions provided.'
        })

        message.channel.send(embed);
    }
}