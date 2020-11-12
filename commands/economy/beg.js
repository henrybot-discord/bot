const economy = require("../../functions/economy");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "beg",
  description: "Beg for even more coins (not very much)",
  usage: "beg",
  access: "Everyone",
  aliases: [""],
  timeout: 300000,
  run: async (client, msg, args) => {
    const people = [
      "Kanye West" /* dont ask why */,
      "Your Mom",
      "A Rich Man",
      "A Homeless Man",
      "Joe",
      "Your Dog"
    ];
    const person = people[Math.floor(Math.random() * people.length)];

    const randomCoins = Math.floor(Math.random() * 150);

    const guildId = msg.guild.id;
    const userId = msg.author.id;

    const embed = new MessageEmbed();

    let sof = Math.floor(Math.random() * 10)

    if (sof <= 5) {
      embed.setTitle("Success!");
      embed.setDescription(
        `You begged **${person}** and got **${randomCoins}** coins!`
      );
      await economy.addCoins(guildId, userId, randomCoins);
    } else if (sof > 5) {
      embed.setTitle("Fail");
      embed.setDescription("You didn't get any coins... Try again later. :(");
      embed.setColor(`RED`);
    }

    console.log(sof);
    return msg.channel.send(embed);
  }
};
