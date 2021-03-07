module.exports = {
    name: "random",
    description : "returns a random show from the connected plex library",
    execute(message, args, request, cheerio, Discord, userSpecific){
        request("http://" + userSpecific.plexAddress + ":32400/library/sections/6/all?X-Plex-Token=" + userSpecific.plexToken, (error, response, html) => { //Connects to the plex library using provided address and token
        if(!error && response.statusCode == 200){ //If no error and success code
            const $ = cheerio.load(html); //Load html with cheerio
            var elements = new Array;
            $("Directory").each((index, a) =>{ //For each directory tag in results
                elements.push(a)
            })
            const randomNum = Math.floor(Math.random() * elements.length);

            let newEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle($(elements[randomNum]).attr("title"))
                        .setDescription("**Summary:** " + $(elements[randomNum]).attr("summary"))
                        .attachFiles("http://" + userSpecific.plexAddress + ":32400" + $(elements[randomNum]).attr("thumb") + ".png?X-Plex-Token=" + userSpecific.plexToken)
                        .setImage("attachment://" + $(elements[randomNum]).attr("updatedat") + ".png");

            message.channel.send(newEmbed); //Push a random message
        }
        else{
            console.log("connection error") //If issue occurs log error
        }
    }) 
    }
}