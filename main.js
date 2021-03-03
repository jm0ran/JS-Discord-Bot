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


    if(command === "echo"){ //If command is equal to echo, 3 equals sign 
        if (args.length >= 1){ //If arguments has 1
            var returnMessage = ""; //Creates a varaible for return message
            for (var x = 0; x < args.length; x++){ //For each argument
                returnMessage += args[x] + " "; //Concatinate arguments together
            }
            console.log(returnMessage) 
            message.channel.send(returnMessage, {tts: true}); //Returns the message with thxt to speech
        }
    }
    else if(command === "kill"){
        if(args.length >= 1){
            try{
                const userId = message.mentions.users.first().id;
                message.guild.member(userId).voice.setChannel(null);
            }
            catch (error){
                message.channel.send(error);
            }
            
        }
    }
})


client.login(userSpecific.token); //Logs into client using token from the userSpecific, keep at end