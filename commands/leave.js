module.exports = {
    name: "leave",
    description : "Stops music bot",
    execute(message, args, client){
        if(args.length == 0){ 
            client.player.stop(message);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}



