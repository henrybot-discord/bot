module.exports = {
  name: "emotes",
  description: "Lists all emotes which the bot can use",
  usage: "emotes",
  aliases: ["emojis", "listemotes", "listemojis"],
  access: "Bot Owner",
  ownerOnly: true,
  run: async (client, msg, args) => {
    let arr = [];
    client.emojis.cache.forEach(emoji => {
        arr.push(emoji);
        if(arr.join('').length > 1950){
            msg.channel.send(arr.join(''));
            arr = [];
        }
    })
    if(arr.length){
        return msg.channel.send(arr.join(''));
    }
  }
}