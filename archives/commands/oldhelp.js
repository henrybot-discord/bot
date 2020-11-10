const prefix = process.env.PREFIX //hello 
const { MessageEmbed } = require('discord.js')
function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = {
  name: "help",
  usage: "henry help [optional command]",
  access: "Everyone",
  description: "Lists all of henry bots commands.",
  aliases: ['commands', 'halp', 'h'],
  ownerOnly: false,
  run: async(client,msg,args) => {   
    const data = [];
        const { commands } = msg.client;

        if(!args.length) {
            data.push(`Here are my commands. My prefix in this server is **${prefix}**\n`);
            data.push(`\`${prefix}` + commands.map(c => c.name).join(`\`, \`${prefix}`) + '`');
            data.push(`\nYou can use ${prefix}help [command name] to get info about a specific command.`);
            
            const embed =  new MessageEmbed()
            .setTitle("Henry Bot Commands")
            .setDescription(data)
            msg.channel.send(embed)
            
            return;
        }

        const name = args[0];
        const cmd = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!cmd){
            setTimeout(() => {
              let msg1 = msg.channel.send(`"${name}" is not a valid command.`);
            }, 5000)
          
            msg.delete()
            
            // almost finished dont delete plz :C Ok I wont. https://github.com/telkenes/command-handler/blob/master/index.js if you ever need inspiration
            return;
        }

        data.push(`Name: ${cmd.name}`);
        data.push(`Description: ${cmd.description}`);
        data.push(`Usage: ${cmd.usage}`)
        data.push(`Accessable By: ${cmd.access}`)

        const embed = new MessageEmbed()
        .setTitle(`${cap(cmd.name)} Command`)
        .setDescription(data)
        msg.channel.send(embed)
  }
}