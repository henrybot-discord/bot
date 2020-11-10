module.exports = (client) => {
  client.promptMessage = async (message, author, time, validReactions) => {
  time *= 1000;

		// For every emoji in the function parameters, react in the good order.
		for (let reaction of validReactions) {
			await message.react(reaction);
		}

		// Only allow reactions from the author,
		// and the emoji must be in the array we provided.
		const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

		// And ofcourse, await the reactions
		return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
  }
}