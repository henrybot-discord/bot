const { MessageEmbed } = require("discord.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
  name: "rps",
  description: "Play rock paper scissors with Henry Bot!",
  usage: "rps",
  access: "Everyone",
  aliases: ["rockpaperscissors"],
  ownerOnly: false,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed().setDescription(
      "Add a reaction to one of these emojis to play the game!"
    );

    const message = await msg.channel.send(embed);
    const reacted = await client.promptMessage(
      message,
      msg.author,
      30,
      chooseArr
    );

    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    const getResult = function(me, clientChosen) {
      if (
        (me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")
      ) {
        return "You won!";
      } else if (me === clientChosen) {
        return "It's a tie!";
      } else {
        return "You lost!";
      }
    };

    const result = getResult(reacted, botChoice);
    await message.reactions.removeAll();

    embed.setDescription("").addField(result, `${reacted} vs ${botChoice}`);

    message.edit(embed);
  }
};
