module.exports = {
    name: "leave",
    description : "Stops music bot",
    execute(message, args, client, Discord){
        if(args.length == 0){ 
            client.player.stop(message);
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("KanyeBot")
                .setDescription("Kanye Bot Left the Voice Channel");
            message.channel.send(newEmbed);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}



