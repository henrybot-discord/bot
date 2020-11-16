const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "meme",
  usage: "meme",
  access: "Everyone",
  description: "Returns a meme from Reddit. (r/memes)",
  aliases: [''],
  ownerOnly: false,
  run: async(client,msg,args) => {
  
  const fetch = require("node-fetch")
	const Discord = require('discord.js');

	const text = args
        .slice(1, args.length)
        .join(' ');
  
    /* let subs = [
      'https://www.reddit.com/r/dankmemes/top/.json?sort=top&t=day&limit=100',
      'https://www.reddit.com/r/dank_meme/top/.json?sort=top&t=day&limit=40',
      'https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100',
      'https://www.reddit.com/r/meirl/top/.json?sort=top&t=day&limit=100',
      'https://www.reddit.com/r/dankmemes/top/.json?sort=top&t=day&limit=100',
      'https://www.reddit.com/r/2meirl4meirl/top/.json?sort=top&t=day&limit=100',
      'https://www.reddit.com/r/PrequelMemes/top/.json?sort=top&t=day&limit=100',
      'https://www.reddit.com/r/surrealmemes/top/.json?sort=top&t=week&limit=100',
      'https://www.reddit.com/r/DeepFriedMemes/top/.json?sort=top&t=day&limit=100'
    ]; */

    let sub = "https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100";
    let limit = sub.split('limit=')[1];
    const res = await fetch("https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100")
    .then(res => res.json())
      .then(json => {
          return json
        });

    const posts = res.data.children.filter(post => post.data.post_hint === 'image');
    const post = posts[Math.floor(Math.random() * Number(limit) - 1)];

	const embed = new Discord.MessageEmbed()
    .setImage(post.data.url)
    .setFooter(`👍 ${post.data.ups} - 💬 ${post.data.num_comments} | ${post.data.subreddit}`)
		.setDescription(post.data.selftext)
    .setTitle(post.data.title)
    .setURL(`https://www.reddit.com${post.data.permalink}`)

	msg.channel.send(embed);
  }
}