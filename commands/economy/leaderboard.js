const mongo = require('../../functions/connectMongo.js')
const Coins = require('../../models/economyProfile.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "leaderboard",
  description: "Lists who has the most money.",
  usage: "leaderboard [optional page]",
  aliases: ["lb"],
  access: "Everyone",
  run: async(client, msg, args) => {
    
    Coins.find({
      guildId: msg.guild.id
    }).sort([
      ['coins', 'descending']
    ]).exec((err, res) => {
      if (err) console.log(err);
      
      const embed = new MessageEmbed()
      .setTitle("Henry Bot Leaderboard")
      
      let page = Math.ceil(res.length / 10)
      
      let pg = parseInt(args[0])
      if (!pg !== Math.floor(pg)) pg = 1
      if (!pg) pg = 1
      let start = (pg * 10) - 10
      let end = pg * 10
      
      if(res.length === 0) {
         embed.addField("No profiles found.", "Go work so you can show up on this leaderboard!")
        
      } else if (res.length <= start) {
        
        embed.addField("Error", "Page not found.")
        
      } else if (res.length <= end) {
        
        var i;
        
        embed.setFooter(`Page ${pg} of ${page}`)
        
        for (i = start; i < res.length; i++) {
          let name = msg.guild.members.cache.get(res[i].userId) || "User left the server."
          
          if(name === "User left the server.") {
            embed.addField(`${i + 1}. ${name}`, `**Coins**: ${res[i].coins}`)
          } else {
            embed.addField(`${i + 1}. ${name.user.username}`, `**Coins**: ${res[i].coins.toLocaleString()}`)
          }
        }
        
      } else {
        var i;
        
        embed.setFooter(`Page ${pg} of ${page}`)
        
        for (i = start; i < end; i++) {
          let name = msg.guild.members.cache.get(res[i].userId) || "User left the server."
          
          if(name === "User left the server.") {
            embed.addField(`${i + 1}. ${name}`, `**Coins**: ${res[i].coins}`)
          } else {
            embed.addField(`${i + 1}. ${name.user.username}`, `**Coins**: ${res[i].coins.toLocaleString()}`)
          }
        }
      }
      
      msg.channel.send(embed)
      console.log(args[0])
    })
  }
}