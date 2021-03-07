module.exports = {
    name: "recent",
    description : "returns recent shows from plex library",
    execute(message, args, request, cheerio, Discord, userSpecific){
        request("http://" + userSpecific.plexAddress + ":32400/library/sections/6/recentlyAdded?X-Plex-Token=" + userSpecific.plexToken, (error, response, html) => { //Connects to the plex library using provided address and token
            if(!error && response.statusCode == 200){ //If no error and success code
                const $ = cheerio.load(html); //Load html with cheerio
                var results = new Array; //Create a new array for results
                var content = $("Video").each((index, a) =>{
                    if (index < 3){ //Runs for top 5
                        let newEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle($(a).attr("grandparenttitle") + ": " + $(a).attr("title"))
                            .attachFiles("http://" + userSpecific.plexAddress + ":32400" + $(a).attr("grandparentthumb") + ".png?X-Plex-Token=" + userSpecific.plexToken)
                            .setImage("attachment://" + $(a).attr("updatedat") + ".png");

                        results.push(newEmbed);
                    }else{return false} //If has run for first 5 return false which will break from .each()
                });
                
                for(var x = 0; x < results.length; x++){
                    message.channel.send(results[x]); //Send formatted text as a message
                }
                
                
            }
            else{
                console.log("connection error") //If issue occurs log error
            }
        })
    }
}









