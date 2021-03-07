module.exports = {
    name: "resume",
    description : "resumes currently playing song",
    execute(message, args, client){
        if(args.length == 0){ 
            client.player.resume(message);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }
}






