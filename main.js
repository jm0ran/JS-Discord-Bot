const userSpecific = require("./userSpecific"); //Imports userSpecific, this is where you import userSpecific data such as your bot's token
const Discord = require("discord.js"); //Imports DiscordJS
const { Player } = require("discord-player");
const request = require("request");
const cheerio = require("cheerio"); 

const client = new Discord.Client(); //Creates a new client/bot
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
        if (args.length >= 1){ //If arguments has 1
            var returnMessage = ""; //Creates a varaible for return message
            for (var x = 0; x < args.length; x++){ //For each argument
                returnMessage += args[x] + " "; //Concatinate arguments together
            }
            message.channel.send(returnMessage, {tts: true}); //Returns the message with thxt to speech
        }
    }
    else if(command === "kill"){ //Command to disconnect someone from voice chat
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
    else if(command === "play"){ //Accepts a url as first argument and plays music
        if(args.length == 1){ //If there is a single argument
            client.player.play(message, args[0]); //Plays music given message and url
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }

    else if(command === "pause"){
        if(args.length == 0){ 
            client.player.pause(message); //Pause song
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }

    else if(command === "resume"){ //Resumes song
        if(args.length == 0){ 
            client.player.resume(message);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }

    else if(command === "skip"){ //Resumes song
        if(args.length == 0){ 
            client.player.skip(message);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }

    else if(command === "leave"){ //Resumes song
        if(args.length == 0){ 
            client.player.stop(message);
        }
        else{
            message.channel.send('Error'); //Informs user of error
        }
    }

    else if(command === "random-anime"){ //Command to return a random anime from connected plex library
        request("http://" + userSpecific.plexAddress + ":32400/library/sections/6/all?X-Plex-Token=" + userSpecific.plexToken, (error, response, html) => { //Connects to the plex library using provided address and token
            if(!error && response.statusCode == 200){ //If no error and success code
                const $ = cheerio.load(html); //Load html with cheerio
                var results = new Array; //Create a new array for results
                $("Directory").each((index, a) =>{ //For each directory tag in results
                    results.push("**Title:** " + $(a).attr("title") + "\n**Summary:** " + $(a).attr("summary")); //Create messages for each item
                })
                
                message.channel.send(results[Math.floor(Math.random() * results.length)]); //Push a random message
            }
            else{
                console.log("connection error") //If issue occurs log error
            }
        })
    }
	
	else if(command === "recent"){
		request("http://" + userSpecific.plexAddress + ":32400/library/sections/6/recentlyAdded?X-Plex-Token=" + userSpecific.plexToken, (error, response, html) => { //Connects to the plex library using provided address and token
		    if(!error && response.statusCode == 200){ //If no error and success code
		        const $ = cheerio.load(html); //Load html with cheerio
		        var results = new Array; //Create a new array for results
		        var content = $("Video").each((index, a) =>{
					if (index < 5){ //Runs for top 5
						results.push($(a).attr("grandparenttitle") + ": " + $(a).attr("title")); //Formats text 1st stage
					}else{return false} //If has run for first 5 return false which will break from .each()
		        });
		        
				var formatted = new String; //New variable for formatted text
		
				for (var x = 0; x < results.length; x++){ //for each result
					formatted += results[x] + "\n"; //Add to formatted string and move to a new Line
				}
				
				message.channel.send(formatted); //Send formatted text as a message
				
		    }
		    else{
		        console.log("connection error") //If issue occurs log error
		    }
		})
	}

    //Doesnt Currently Work, need to figure this out
    else if(command === "queue"){
        message.channel.send(client.player.getQueue(message));
    }

    else if(command === "eli"){ //Funny command for eli
        message.channel.send("is stupid lol"); //Returns message
    }

})


client.login(userSpecific.discordToken); //Logs into client using token from the userSpecific, keep at end