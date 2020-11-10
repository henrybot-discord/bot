module.exports = {
  name: "say",
  description: "Make the bot say your message.",
  usage: "say",
  aliases: ["s"],
  access: "Bot Owner",
  ownerOnly: true,
  run: async (client, msg, args) => {
    let text = msg.content.slice(process.env.PREFIX.length + 3)
    
    if (!text) return msg.channel.send("You need to provide some text.").then(async e => {
      await e.delete({ timeout: 3500 })                                                                                 
    })
    
    msg.delete()
    
    msg.channel.send(text)
  }
}