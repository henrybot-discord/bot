const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks a member.",
  usage: "kick (required mention)",
  access: "Kick Members",
  aliases: ["k"],
  ownerOnly: false,
  run: async (client, msg, args) => {
    if (!msg.member.hasPermission("KICK_MEMBERS"))
      return msg.channel.send(
        "You do not have the correct permissions to do this command."
      );
    if (!args[1])
      return msg.channel.send("You need to provide a person to kick.");
    const target = msg.mentions.members.first();

    const embed = new MessageEmbed()
      .setTitle("Member sucessfully kicked :thumbsup:")
      .setDescription(`${msg.author} has kicked ${target}`);
    msg.channel.send(embed);

    target.kick();
  }
};
