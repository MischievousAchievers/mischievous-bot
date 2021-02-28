const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');
const util = require('minecraft-server-util');

const client = new Discord.Client();

function getDirectories() {
    return fs.readdirSync(__dirname + '/commands').filter(function subFolder(file) {
        return fs.statSync(__dirname + '/commands/' + file).isDirectory();
    });
}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const folder of getDirectories()) {
    const folderFiles = fs.readdirSync(__dirname + '/commands/' + folder).filter(file => file.endsWith('.js'));
    for (const file of folderFiles) {
        commandFiles.push([folder, file]);
    }
}

for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(__dirname + `/commands/${file[0]}/${file[1]}`);
    } else {
        command = require(__dirname + `/commands/${file}`);
    }
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Bot Online!");
    client.user.setActivity(`over the server.`, {
        type: "WATCHING"
    });
});

client.on('guildMemberAdd', (member) => {

    const d = new Date(member.user.createdAt).toString();
    const d1 = new Date(member.joinedTimestamp).toString();

    const d2 = d.split(' ')
    const d3 = d1.split(' ')

    const embed = new Discord.MessageEmbed()
        .setTitle(`New User: ${member.user.tag}`)
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

    const channel = member.guild.channels.cache.get('811124554884972564')
    return channel.send(embed);
})

let prefix = config.prefix;

client.on('message', message => {
    if (message.channel.id === '811003528373993515') {
        if (message.author.id == '811003233165115423') return;
        if (message.author.bot) return;
        if (!message.content.includes(">verify")) return message.delete();
    }
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments.`;
        let usage = `Usage: \`${prefix}${command.name} ${command.usage}\``

        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColorError)
            .setDescription(`${reply}\n\n${usage}`)

        return message.channel.send(embed);
    }

    try {
        command.execute(message, args);
    } catch (error) {

        console.error(error);
        const embed = new Discord.MessageEmbed()
            .setColor('#ff6961')
            .setTitle('ERROR')
            .setDescription("There was an error executing that command!")
            .addFields({
                name: 'Error',
                value: `\`\`\`${error}\`\`\``,
            }, {
                name: `Command`,
                value: `\`${message}\``,
            })
            .setTimestamp()
        return message.channel.send(embed);

    }
});

client.login(config.token);