const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "stupidrate",
  description: "Gives you a percentage of how stupid you are.",
  usage: "stupid [optional mention]",
  access: "Everyone",
  aliases: ['howstupid', "sr"],
  ownerOnly: false,
  run: async(client,msg,args) => {
    const randomStupid = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    let user = msg.mentions.users.first() || msg.author
    
    let embed = new MessageEmbed()
    .setTitle("The Stupid Meter")
    .setDescription(`${user}, you are ${randomStupid(1, 100)}% stupid.`)
    msg.channel.send(embed)
  }
}