const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "userinfo",
  description: "Tells your info or someone elses info.",
  usage: "userinfo [optional mention]",
  aliases: ['whois', 'ui'],
  access: "Everyone",
  ownerOnly: false,
  run: async(client,msg,args) => {
    let user = msg.mentions.users.first() || msg.author;
    const member = msg.guild.members.cache.get(user.id)
    
    const embed =  new MessageEmbed()
    .setTitle(`${user.username}'s Info`)
    .setThumbnail(user.displayAvatarURL())
    .addField(`Username and Tag`, `${user.tag}`, true)
    .addField(`Nickname`, `${member.nickname || 'No nickname'}`, true)
    .addField(`ID`, `${user.id}`, true)
    .addField(`Joined server at:`, `${new Date(member.joinedTimestamp).toLocaleDateString()}`, true)
    .addField(`Joined discord at:`, `${new Date(user.createdTimestamp).toLocaleDateString()}`, true)
    .addField(`Role count`, `${member.roles.cache.size - 1}`, true)
    msg.channel.send(embed)
  }
}