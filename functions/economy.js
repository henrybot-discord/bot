const mongoConnection = require("./connectMongo.js");
const profileSchema = require("../models/economyProfile.js");

module.exports = client => {};

module.exports.getCoins = async (guildId, userId) => {
  return await mongoConnection().then(async mongoose => {
    //Running findOne to get guild and user ids.
    const result = await profileSchema.findOne({
      guildId,
      userId
    });

    // We check if they have a profile or not. If they do, the coins will show.
    // If they dont, make a new profile.
    let coins;
    if (result) {
      coins = result.coins;
    } else {
      coins = 0;

      await new profileSchema({
        guildId,
        userId,
        coins
      }).save();
    }

    return coins;

    mongoose.connection.close();
  });
};

module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongoConnection().then(async mongoose => {
    //We run the findOne() function to check for the profile.
    const result = await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId
      },
      {
        guildId,
        userId,
        $inc: {
          coins
        }
      },
      {
        upsert: true,
        new: true
      }
    );

    return result.coins;

    mongoose.connection.close();
  });
};


// Notes and functions made by chomp :)
