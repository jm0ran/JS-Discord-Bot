module.exports = {
    name: "play",
    description : "plays a song given a youtube url",
    execute(message, args, client){
        if(args.length == 1){ //If there is a single argument
            client.player.play(message, args[0]); //Plays music given message and url
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}