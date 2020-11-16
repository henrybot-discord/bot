const prefix = process.env.PREFIX; //hello
const fs = require("fs");
const { MessageEmbed } = require("discord.js");

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  name: "help",
  usage: "help [optional command]",
  access: "Everyone",
  description: "Lists all of henry bots commands.",
  aliases: ["commands", "halp", "h", "cmds"],
  ownerOnly: false,
  run: async (client, msg, args) => {
    const GuildSettings = require("../../models/settings");
    // Retriving the guild settings from database.
    var storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });
    
    const cmds = client.commands;
    let categories = fs.readdirSync("./commands/");
    let commands = {};
    
    if(!args.length) {
      
    categories.forEach(cat => {
      commands[cat] = [];
    });
    cmds.array().forEach(c => {
      commands[c.category].push(`\`${c.name}\``);
    });
    let embed = new MessageEmbed().setTitle("Help Command:");
    categories.forEach(cat => {
      if (!commands[cat][0]) return;
      embed.addField(
        `❯ ${cap(cat)} [${commands[cat].length}]:`,
        commands[cat].join(", ")
      );
    });
    embed.setDescription(
      `These are the avaliable commands for ${client.user.username}\nThe bot prefix for this server is: \`${storedSettings.prefix}\`\nYou can find the dashboard here: https://henrysbot.glitch.me (be aware that it currently does not work.)`//currently does not work right now, there's two words/phrases meaning at this instance :p
    );
    embed.setFooter(
      `Total Commands: ${client.commands.size}`,
      client.user.displayAvatarURL()
    );
    msg.channel.send(embed);
    } 
    
    else if(args.length = 1){
    
    const data = [];

    const name = args[0];
    const cmd =
      client.commands.get(name) ||
      client.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!cmd) {
      let msg1 = msg.channel.send(`"${name}" is not a valid command.`);
      
      return;
    }

    data.push(`Name: ${cmd.name}`);
    data.push(`Description: ${cmd.description}`);
    data.push(`Usage: \`${storedSettings.prefix}${cmd.usage}\``);
    data.push(`Accessable By: ${cmd.access}`);
    data.push(`Aliases: \`${cmd.aliases.join('`, `')}\`` || `None`);

    const embed2 = new MessageEmbed()
      .setTitle(`${cap(cmd.name)} Command`)
      .setDescription(data);
    msg.channel.send(embed2);
  }
  }
}; //hello
