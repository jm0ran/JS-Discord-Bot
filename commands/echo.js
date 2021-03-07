module.exports = {
    name: "echo",
    description : "echos the user's arguments",
    execute(message, args){
        if (args.length >= 1){ //If arguments has 1
            var returnMessage = ""; //Creates a varaible for return message
            for (var x = 0; x < args.length; x++){ //For each argument
                returnMessage += args[x] + " "; //Concatinate arguments together
            }
            message.channel.send(returnMessage, {tts: true}); //Returns the message with thxt to speech
        }    
    }
}