module.exports = {
    name: "uptime",
    description : "returns the bot's uptime",
    execute(message, args, Discord, uptime){
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Uptime")
            .setDescription(`Bot has been running for ${Math.floor(uptime)} seconds.`);
        message.channel.send(newEmbed);
    }
}