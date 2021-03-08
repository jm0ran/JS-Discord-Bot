module.exports = {
    name: "recent",
    description : "returns recent shows from plex library",
    execute(message, args, request, cheerio, Discord, userSpecific){
        request("http://" + userSpecific.plexAddress + ":32400/library/sections/6/recentlyAdded?X-Plex-Token=" + userSpecific.plexToken, (error, response, html) => { //Connects to the plex library using provided address and token
            if(!error && response.statusCode == 200){ //If no error and success code
                const $ = cheerio.load(html); //Load html with cheerio
                var description = new String; //Create a new array for results
                var thumbName = null;
                var thumbPath = null;
                var content = $("Video").each((index, a) =>{
                    if (index < 3){ //Runs for top 5
                        if (index == 0){
                            thumbPath = "http://" + userSpecific.plexAddress + ":32400" + $(a).attr("grandparentthumb") + ".png?X-Plex-Token=" + userSpecific.plexToken;
                            thumbName = "attachment://" + $(a).attr("updatedat") + ".png";
                        }
                        description += "**" + $(a).attr("grandparenttitle") + "**: " + $(a).attr("title") + "\n";
                    }
                    else{return false} //If has run for first 5 return false which will break from .each()
                });

                let newEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Recently Added Anime")
                            .setDescription(description)
                            .attachFiles(thumbPath)
                            .setThumbnail(thumbName);
                
                message.channel.send(newEmbed);
                
                
            }
            else{
                console.log("connection error") //If issue occurs log error
            }
        })
    }
}









