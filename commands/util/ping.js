const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "ping",
  usage: "ping",
  access: "Everyone",
  description: "Displays your websocket and message ping.",
  aliases: ['p'],
  ownerOnly: false,
  run: async(client,msg,args) => {
    const message = await msg.channel.send("Pinging")
    const embed = new MessageEmbed()
    .setTitle(":ping_pong: Pong!")
    .setDescription(`:electric_plug: Websocket Ping: ${client.ws.ping}ms\n :ping_pong: Message Ping: ${Math.floor(message.createdTimestamp - msg.createdTimestamp)}ms`)
    message.delete()
    msg.channel.send(embed)
  }
}