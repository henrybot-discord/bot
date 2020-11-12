const economy = require('../../functions/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "work",
  description: "Work to get coins.",
  usage: 'work',
  access: 'Everyone',
  aliases: ["w"],
  timeout: 600000, // Timeout (10 mins) :) :D
  run: async(client,msg,args) => {
    const jobs = ['Youtuber', 'Programmer', "Doctor", 'Fast Food Worker', 'Mechanic', 'Builder', 'Nurse']
    const job = jobs[Math.floor(Math.random() * (jobs.length))]
    
    const randomCoins = Math.floor(Math.random() * 500)
    
    const guildId = msg.guild.id
    const userId = msg.author.id
    
    const newCoins = await economy.addCoins(guildId, userId, randomCoins)
    
    const embed = new MessageEmbed()
    .setTitle('Payday!')
    .setDescription(`You worked as a **${job}** and got **${randomCoins}** coins!`)
    msg.channel.send(embed)
  }
}