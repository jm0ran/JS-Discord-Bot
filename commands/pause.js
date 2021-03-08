module.exports = {
    name: "pause",
    description : "pauses currently playing song",
    execute(message, args, client, Discord){
        if(args.length == 0){ 
            client.player.pause(message); //Pause song
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("KanyeBot")
                .setDescription("Kanye Bot Paused the Music");
            message.channel.send(newEmbed);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}




