const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "annoyrate",
  description: "Gives you a random percentage of how annoying someone is or you are.",
  usage: "annoyrate [optional mention]",
  access: "Everyone",
  aliases: ['annoyingrate', "ar"],
  ownerOnly: false,
  run: async(client,msg,args) => {
    const randomAnnoyrate = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    let user = msg.mentions.users.first() || msg.author
    
    let embed = new MessageEmbed()
    .setTitle("The Annoying Meter")
    .setDescription(`${user}, you are ${randomAnnoyrate(1, 100)}% annoying.`)
    msg.channel.send(embed)
  }
}


