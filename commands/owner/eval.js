module.exports = {
  name: "eval",
  description: "Evaluates your JS code.",
  usage: "eval [JS code]",
  aliases: ["e", "exec", "ev"],
  access: "Bot Owners",
  ownerOnly: true,
  run: async (client, msg, args) => {
    const { inspect } = require("util")
    const fetch = require('node-fetch')
      try {
        let toEval = args.join(" ")

    if(!toEval && msg.attachments.size){
        try{
            msg.content = await (await fetch(msg.attachments.filter(v => v.filename.endsWith('.txt')).first().url)).text();
        }catch(e){}
    }

        let evaluated = inspect(eval(toEval), { depth: 0 });

        if (!toEval) {
          return msg.channel.send(`Could Not Evaluate: \`air\``);
        } else {
          let hrStart = process.hrtime();
          let hrDiff;
          hrDiff = process.hrtime(hrStart);
          return msg.channel.send(
            `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] /
              1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``,
            { split: { maxLength: 1900 } }
          );
        }
      } catch (e) {
        return msg.channel.send(`Error while evaluating: \`\`\`${e.message}\`\`\``);
      }
    } 
  }