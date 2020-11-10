const { MessageEmbed } = require('discord.js')
const chooseArr = ['💩', '🍴']

module.exports = {
  name: "poop",
  description: "poop",
  usage: "poop",
  access: "Everyone",
  aliases: ['turd', "poo",],
  ownerOnly: false,
  run: async(client,msg,args) => {
    msg.channel.send(`💩`)
    await client.sleep(2000)
    const message = await msg.channel.send("🍴")
    const reacted = await client.promptMessage(message, msg.author, 10, chooseArr);
    msg.channel.send(`user reacted with ${reacted}`)
  }
}