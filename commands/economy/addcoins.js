const { MessageEmbed } = require('discord.js')
const economy = require('../../functions/economy')

module.exports = {
  name: "addcoins",
  description: "Add coins to you or another user.",
  usage: "addcoins (required coins) [optional mention]",
  access: "Administrator",
  aliases: ["ac"],
  run: async(client,msg,args)=>{
    const target = msg.mentions.users.first() || msg.author
    const targetId = target.id
    
    if(target.bot) return msg.channel.send("Bots can't have economy profiles.").then(async (e) => {
      await e.delete({ timeout: 5000 })
    })
    
    if(!msg.author.permissions.has("ADMINISTRATOR")) {
      return msg.channel.send("You don't have permissions to do this command.")
    }
    
    const guildId = msg.guild.id
    const userId = msg.author.id

    const coins = await economy.addCoins(guildId, targetId, args[0])
    
    const embed = new MessageEmbed()
    .setTitle(`Coins sucessfully added`)
    .setDescription(`Added ${args[0]} coins to ${target}.`)

    msg.channel.send(embed)
  }
}