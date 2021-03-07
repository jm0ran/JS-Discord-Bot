module.exports = {
    name : "interrupt",
    description: "interrupts a user by deafining then undeafining",
    execute(message, args){
        const fMember = message.mentions.members.first();
        fMember.voice.setMute(true); 
        setTimeout(() => {
            fMember.voice.setMute(false); 
        }, 2000)
    }
}