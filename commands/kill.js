module.exports = {
   name: 'kill',
   description: 'removes user from voice channel',
   execute(message, args){
        if(args.length >= 1){ //If argument length is greater than or equal to 1
            try{ //try
                const userId = message.mentions.users.first().id; //Grab userId of first person mentioned in message
                message.guild.member(userId).voice.setChannel(null); //Sets that persons voice channel to null
            }
            catch (error){ //If error
                message.channel.send("Error"); //Send Message error
            }
        }
   }
}