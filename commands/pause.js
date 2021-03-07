module.exports = {
    name: "pause",
    description : "pauses currently playing song",
    execute(message, args, client){
        if(args.length == 0){ 
            client.player.pause(message); //Pause song
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}




