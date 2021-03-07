module.exports = {
    name: "skip",
    description : "skips currently playing song",
    execute(message, args, client){
        if(args.length == 0){ 
            client.player.skip(message);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}



