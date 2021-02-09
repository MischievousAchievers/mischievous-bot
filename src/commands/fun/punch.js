module.exports = {
    name: 'punch',
    description: 'Punch someone',
    fun: true,
    execute(message) {
        const user = message.mentions.members.first();

        if (!user) return message.channel.send(`${message.author} swung, missed, spun, and face planted like a loser!`)

        message.channel.send(`${message.author} gave ${user} a knuckle sandwich!`)
    }
}