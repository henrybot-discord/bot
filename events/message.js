const Timeout = new Set()
const ms = require('ms')

module.exports = {
    run: async (client, msg) => {
        const GuildSettings = require("../models/settings");
        // Retriving the guild settings from database.
        var storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });
        if (!storedSettings) {
          // If there are no settings stored for this guild, we create them and try to retrive them again.
          const newSettings = new GuildSettings({
            gid: msg.guild.id
          });
          await newSettings.save().catch(()=>{});
          storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });
        }
        if (msg.author.bot) return
        if (!msg.content.startsWith(storedSettings.prefix)) return
        if (!msg.guild) return
        if (!msg.member) msg.member = await msg.guild.fetchMember(msg)

        const args = msg.content.slice(storedSettings.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase()

        if (cmd.length === 0) return

        let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (command) {
          if (command.ownerOnly == true) {
          //let ownerIds = ['50419822949223630', '51453071331242805']
          //if (!ownerIds.includes(msg.author.id)) return;
            if (msg.author.id !== '504198229492236309' && msg.author.id !== '514530713312428054') return msg.channel.send('Nice try, but only my devs can use that command.')
          }
          // Individual command timeouts
          if (command){
            if(command.timeout) {
              if(Timeout.has(`${msg.author.id}${command.name}`)) {
                return msg.channel.send(`Slow down! You have ${ms(command.timeout)} until you can run this command.`).then(async (e) => {
                  await e.delete({ timeout: 7500 })
                })
              } else {
                Timeout.add(`${msg.author.id}${command.name}`)
                setTimeout(() => {
                  Timeout.delete(`${msg.author.id}${command.name}`)
                }, command.timeout)
              }
            }
            command.run(client,msg,args)
          }
          
          console.log(`Successfully executed ${command.name}`)
          client.stats.commandsExecuted++
        }
      }
    }