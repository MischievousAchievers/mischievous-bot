const Discord = require('discord.js')
const config = require('../../../config.json');
module.exports = {
    name: 'sus',
    description: 'Gives someone the sus role',
    usage: '<user>',
    staff: true,
    async execute(message, args) {


        let sus = message.guild.roles.cache.get("805918167372136519");
        const member = message.mentions.members.first();

        if (message.member.roles.cache.some(r => ["Moderator", "Sublegion Leader", "Sublegion Staff", "Raid Leader", "Leader"].includes(r.name))) {
            if (member.roles.cache.some(role => role.name === 'sus')) {
                member.roles.remove(sus);
            } else {
                await member.roles.set([]);
                member.roles.add(sus);
            }
        } else {
            return;
        }

    }
}