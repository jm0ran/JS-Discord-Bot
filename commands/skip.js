module.exports = {
    name: "skip",
    description : "skips currently playing song",
    execute(message, args, client, Discord){
        if(args.length == 0){ 
            client.player.skip(message);
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("KanyeBot")
                .setDescription("Kanye Skipped The Current Song");
            message.channel.send(newEmbed);
        }
        else{
            message.channel.send('Error'); //Informs user of error
            
        }
    }
}



