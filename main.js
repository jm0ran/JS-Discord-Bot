const userSpecific = require("./userSpecific"); //Imports userSpecific, this is where you import userSpecific data such as your bot's token
const Discord = require("discord.js"); //Imports DiscordJS

const client = new Discord.Client(); //Creates a new client/bot

client.once('ready', function(){ //Runs once on client startup
    console.log("Start Up Initiated"); //Logs an initialization message
})


client.login(userSpecific.token); //Logs into client using token from the userSpecific