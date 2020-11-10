require("dotenv").config();

const { Client, Collection, Permissions, Intents } = require("discord.js");
const client = new Client({
  disableMentions: "everyone",
  ws: { intents: Intents.ALL } //gk
});
const fs = require("fs");
const { join } = require("path");
const GuildSettings = require("./models/settings");
const Dashboard = require("./dashboard/dashboard.js")(client);
const prefix = process.env.PREFIX;
client.config = process.env;

/*
 _    _          _   _ _____  _      ______ _____   _____ 
| |  | |   /\   | \ | |  __ \| |    |  ____|  __ \ / ____|
| |__| |  /  \  |  \| | |  | | |    | |__  | |__) | (___  
|  __  | / /\ \ | . ` | |  | | |    |  __| |  _  / \___ \ 
| |  | |/ ____ \| |\  | |__| | |____| |____| | \ \ ____) |
|_|  |_/_/    \_\_| \_|_____/|______|______|_|  \_\_____/ 

*/

let categories = fs.readdirSync("./commands/");
client.commands = new Collection();
client.aliases = new Collection();
categories.forEach(async category => {
  fs.readdir(`./commands/${category}/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let commandname = file.replace(".js", "");
      let command = require(`./commands/${category}/${file}`);
      command.category = category;
      console.log(
        `${client.cap(
          command.category
        )}: Sucessfully loaded Henry Bot's ${commandname} command.`
      );
      client.commands.set(commandname, command);
      command.aliases.forEach(cmdname => {
        client.aliases.set(cmdname, commandname);
      });
    });
  });
});

//event handler
fs.readdir("./events", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (file.split(".").pop() != "js") return;
    const eventFunction = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
    console.log(`Events: Successfully loaded Henry Bot's ${eventName} event!`);
  });
});

//functions handler
require("./functionshandler")(client);

//some stats stuff
client.stats = {};
client.stats.commandsExecuted = 0;

client.login(process.env.TOKEN);

// Basic bot setup by chomp & henry

// If you are wondering where the mongodb connection is, i put in in the functions folder as connectMongo.js.
