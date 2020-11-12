const { MessageEmbed } = require("discord.js");
const economy = require("../../functions/economy");

module.exports = {
  name: "balance",
  description: "Check how many coins you or someone else have.",
  usage: "balance",
  access: "Everyone",
  aliases: ["bal"],
  run: async (client, msg, args) => {
    const target = msg.mentions.users.first() || msg.author;
    const targetId = target.id;

    if (target.bot)
      return msg.channel
        .send("Bots can't have economy profiles.")
        .then(async e => {
          await e.delete({ timeout: 5000 });
        });

    const guildId = msg.guild.id;
    const userId = msg.author.id;

    const coins = await economy.getCoins(guildId, targetId);

    const embed = new MessageEmbed()
      .setTitle(`${target.username}'s Balance`)
      .setDescription(`This user has **${coins}** coins.`)
      .setFooter("Work to get some more!");
    msg.channel.send(embed);
  }
};
