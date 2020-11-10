module.exports = {
  name: "clear",
  description: "Clears the amount of messages you specifiied (1-100)",
  usage: "clear [required number]",
  aliases: ["purge", "clean", "prune"],
  access: "Manage Messages",
  ownerOnly: false,
  run: async (client, msg, args) => {
    const deleteMsg = parseInt(args[0]) + 1;

    if (!msg.member.hasPermission("MANAGE_MESSAGES"))
      return msg.channel.send(
        "You do not have permissions to do this command."
      );
    if (!args[0])
      return msg.channel.send(
        "You need to specify how many messages you want to clear."
      );
    if (isNaN(deleteMsg)) return msg.channel.send("That isn't a number.");
    if (deleteMsg <= 1 || deleteMsg > 100) //hi
      return msg.channel.send(
        "You can only delete 1 - 100 messages at a time."
      );

    msg.channel.bulkDelete(deleteMsg, true).then(() => {
      msg.reply(`Deleted ${deleteMsg - 1} messages :thumbsup:`).then(async e => {
        await e.delete({ timeout: 3000 });
      });
    });
  }
};
