const MojangAPI = require('mojang-api');
const Discord = require('discord.js')
const config = require('./../../config.json');

module.exports = {
    name: 'namehistory',
    description: 'Give a name history of MC player.',
    args: true,
    aliases: ['nh'],
    usage: '<ign>',
    execute(message, args) {

        const args1 = args.slice(0)
        MojangAPI.nameToUuid(args1, function (err, res) {
            if (res.length === 0) {
                message.channel.send("That username does not exist.")
            } else {
                const uuid = res[0].id
                MojangAPI.nameHistory(uuid, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (res.length == 1) {
                            return message.channel.send(`${res[0].name} has not changed their name.`);
                        } else {
                            let names = [];
                            for (i = 0; i < res.length; i++) {
                                names.push(res[i].name);
                            }
                            const currentName = names.splice(-1)

                            const embed = new Discord.MessageEmbed()
                                .setColor('#00385C')
                                .addFields({
                                    name: "Current Name",
                                    value: `\`${currentName}\``,
                                }, {
                                    name: "Past Names",
                                    value: `\`${names.join(', ')}\``,
                                })
                            return message.channel.send(embed);

                        }
                    }
                });
            }
        });

    }
}