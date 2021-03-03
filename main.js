const userSpecific = require("./userSpecific"); //Imports userSpecific, this is where you import userSpecific data such as your bot's token
const Discord = require("discord.js"); //Imports DiscordJS

const client = new Discord.Client(); //Creates a new client/bot
const prefix = "~";

client.once('ready', function(){ //Runs once on client startup
    console.log("Start Up Initiated"); //Logs an initialization message
})

client.on("message", function(message){ //On message in discord server
    if(!message.content.startsWith(prefix) || message.author.bot){ //If message doesnt start with set prefix or message author is bot
        return; //ignore, ends function
    }

    const args = message.content.slice(prefix.length).split(" "); //Remove first character (the prefix) and splits remaining words into arguments
    const command = args.shift().toLowerCase(); //Removes the first element from array, returns it, and makes it lower case


    if(command === "echo"){
        if (args.length >= 1){
            var returnMessage = "";
            for (var x = 0; x < args.length; x++){
                returnMessage += args[x] + " ";
            }
            console.log(returnMessage)
            message.channel.send(returnMessage, {tts: true});
        }
    }

})


client.login(userSpecific.token); //Logs into client using token from the userSpecific, keep at end