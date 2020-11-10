const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans a member.",
  usage: "ban (required mention)",
  access: "Ban Members",
  aliases: ["b"],
  ownerOnly: false,
  run: async (client, msg, args) => {
    if (!msg.member.hasPermission("BAN_MEMBERS"))
      return msg.channel.send(
        "You do not have the correct permissions to do this command."
      );
    if (!args[1])
      return msg.channel.send("You need to provide a person to ban.");
    const target = msg.mentions.members.first();

    const embed = new MessageEmbed()
      .setTitle("Member sucessfully banned :thumbsup:")
      .setDescription(`${msg.author} has banned ${target}`);
    msg.channel.send(embed);

    target.ban();
  }
};
