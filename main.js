const userSpecific = require("./userSpecific"); //Imports userSpecific, this is where you import userSpecific data such as your bot's token
const Discord = require("discord.js"); //Imports DiscordJS
const { Player } = require("discord-player");
const request = require("request");
const cheerio = require("cheerio"); 
const fs = require('fs');
const { uptime } = require("process");

const client = new Discord.Client(); //Creates a new client/bot

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"))
for(const file of commandFiles){ //New type of for loop syntax
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


const player = new Player(client);
client.player = player;

const prefix = "~";

var playingMusic = false;


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
        client.commands.get("echo").execute(message, args);
    }
    else if(command === "kill"){ //Command to disconnect someone from voice chat
        client.commands.get("kill").execute(message, args);
    }
    else if(command === "play"){ //Accepts a url as first argument and plays music
        client.commands.get("play").execute(message, args, client);
    }
    else if(command === "pause"){ //Pauses song
        client.commands.get("pause").execute(message, args, client);
    }
    else if(command === "resume"){ //Resumes song
        client.commands.get("resume").execute(message, args, client);
    }
    else if(command === "skip"){ //Resumes song
        client.commands.get("skip").execute(message, args, client);
    }
    else if(command === "leave"){ //Resumes song
        client.commands.get("leave").execute(message, args, client);
    }
    else if(command === "random"){ //Command to return a random anime from connected plex library
        client.commands.get("random").execute(message, args, request, cheerio, Discord, userSpecific);
    }
	else if(command === "recent"){
		client.commands.get("recent").execute(message, args, request, cheerio, Discord, userSpecific);
	}
    else if(command === "uptime"){
        client.commands.get("uptime").execute(message, args, Discord, uptime());
    }
    else if(command === "interrupt"){
        client.commands.get("interrupt").execute(message, args);
    }



    //When I rework/keep these commands they need to be made external
    else if(command === "queue"){
        message.channel.send(client.player.getQueue(message));
    }

    else if(command === "eli"){ //Funny command for eli
        message.channel.send("is stupid lol"); //Returns message
    }

})


client.login(userSpecific.discordToken); //Logs into client using token from the userSpecific, keep at end