const Discord = require('discord.js')
const config = require('../../../config.json');
module.exports = {
    name: 'unban',
    description: 'Unban a user from the server',
    usage: '<user id>',
    staff: true,
    async execute(message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS')) return;

        const id = args[0];
        const bans = await message.guild.fetchBans();
        const bansArray = bans.array();

        let bannedUsers = []
        bansArray.forEach((x) => {
            bannedUsers.push(x.user.id);
        })
        if (!bannedUsers.includes(id)) return message.channel.send("That user is not banned.");
        await message.guild.members.unban(id);
        return message.react('✅');
    }
}