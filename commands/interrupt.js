module.exports = {
    name : "interrupt",
    description: "interrupts a user by deafining then undeafining",
    execute(message, args){
        const fMember = message.mentions.members.first(); //grabs first member
        fMember.voice.setMute(true);  //Mutes first member
        setTimeout(() => { //After 2 seconds unmute first member
            fMember.voice.setMute(false); 
        }, 2000)
    }
}