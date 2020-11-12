const mongo = require("../functions/connectMongo.js");

module.exports = {
  run: async client => {
    console.log(`${client.user.tag} is ready`);
    client.user.setActivity(`henry help | ${client.users.cache.size} users`, {
      type: "LISTENING"
    });
    client.on("error", console.error);
    client.on("warn", console.warn);

    await mongo().then(async () => {
      console.log("MongoDB is connected.");
    });
  }
};
