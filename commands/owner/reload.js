module.exports = {
  name: "reload",
  description: "Reloads a command",
  usage: "reload [command name]",
  aliases: ["rload", "rl"],
  access: "Bot Owners",
  ownerOnly: true,
  run: async (client, msg, args) => {
        let begin = new Date()
          let commandName = args.join(' ')
        if (!args[0]) return msg.channel.send('\\❌ Please provide a command name to reload.');
        if(!client.commands.has(commandName)) return msg.channel.send('\\❌ Invalid command;');
        let cat = client.commands.get(commandName).category
        if (!cat) return
        delete require.cache[require.resolve(`../../commands/${cat}/${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`../../commands/${cat}/${commandName}.js`);
  props.category = cat
  client.commands.set(commandName, props);
  let end = new Date()
  let time = end - begin
  msg.reply(`The command ${commandName} has been reloaded in ${time}ms`)
    } 
  }