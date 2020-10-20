const Discord = require('discord.js');
exports.run = (client, message, args) => {
     
let mention = message.mentions.users.first();
let sender = "";

if (message.channel.guild.member(message.author).nickname == null) {
  sender = message.author.username;
} else {
  sender = message.channel.guild.member(message.author).nickname;
}
if (mention != null || mention != undefined) {
  var name = mention.username + "'s ";
  if (mention.username.endsWith("s")) {
    name = mention.username + "' ";
  }
  const avatarEmbedOther = new Discord.RichEmbed()
  .setAuthor(mention.username + ' Kullanıcısının profil resmi.', mention.avatarURL)
  .setDescription(`[Profil resmini indirmek için tıkla!](${mention.avatarURL})`)
  .setColor(0x3)
  .setImage(mention.avatarURL)
 .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
  message.channel.sendEmbed(avatarEmbedOther);
  return;
} else {
  const avatarEmbedYou = new Discord.RichEmbed()
  .setAuthor(sender + ' Kullanıcısının profil resmi.', message.author.avatarURL)
  .setDescription(`[Profil resmini indirmek için tıkla!](${message.author.avatarURL})`)
  .setColor(0x3)
  .setImage(message.author.avatarURL)
  .setFooter(`Cortex | !!davet yazarak sunucusuna ekle!`, 'https://images-ext-2.discordapp.net/external/H1DYiroEN5EFPujb_YvV-LhXsuIWi3w8gqs69BQbAJ0/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/602585371489861634/59d888f59b9e01bdebb98e8f0548ac2d.png?width=481&height=481')
  message.channel.sendEmbed(avatarEmbedYou);
  return;
}
message.channel.sendMessage("Bi hata oldu galiba? | **!!bildir Avatar komutu çalışmıyor**");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatar'],
  kategori: "GENEL KOMUTLAR",
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Etiketlediğiniz veya kendinizin profil fotosunu gösterir.',
  usage: '!!avatar <etiket> veya !!avatar'
};
