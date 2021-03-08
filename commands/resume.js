module.exports = {
    name: "resume",
    description : "resumes currently playing song",
    execute(message, args, client, Discord){
        if(args.length == 0){ 
            client.player.resume(message);
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("KanyeBot")
                .setDescription("Kanye Bot Resumed the Music");
            message.channel.send(newEmbed);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}






