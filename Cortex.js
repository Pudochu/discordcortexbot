const Discord = require("discord.js");
const request = require("request");
const fs = require('fs');
const ayarlar = require('./ayarlar.json');
const client = new Discord.Client();
const chalk = require('chalk');
const moment = require('moment');
const db = require('quick.db');

client.queue = new Map()


client.on("message", async m => {
  if (m.channel.type === "dm") return;
  let kanal = await db.fetch(`resimkanal_${m.guild.id}`)
  if (m.channel.id !== kanal) { //buraya o kanalın ID'si yazılacak.
    return;
  }
  if (m.author.id === m.guild.ownerID) return;
  if (m.attachments.size < 1) {
    m.delete();
  }
});


client.on("message", msg => {
if (msg.channel.type === 'dm') return;
  if (msg.content.toLowerCase() === prefix + "yak") {
    msg.channel
      .send("🚬 ☁:cloud:☁")
      .then(nmsg => nmsg.edit("🚬 ☁:cloud:☁"))
      .then(nmsg => nmsg.edit("🚬 ☁:cloud:☁"))
      .then(nmsg => nmsg.edit("🚬 ☁:cloud:☁"))
      .then(nmsg => nmsg.edit("🚬 ☁:cloud:"))
      .then(nmsg => nmsg.edit("🚬 ☁:cloud:"))
      .then(nmsg => nmsg.edit("🚬 ☁:cloud:"))
      .then(nmsg => nmsg.edit("🚬 ☁"))
      .then(nmsg => nmsg.edit("🚬 ☁"))
      .then(nmsg => nmsg.edit("🚬 ☁"))
      .then(nmsg => nmsg.edit("🚬 ☁"))
      .then(nmsg =>
        msg
          .edit(
            "**Sigaram bitti.** | **Sigara İçmeyiniz.** 🚭 **Sigara Sağlığa Zararlıdır!**"
          )
          .then(message => message.delete(13000))
      );
  }
});


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(regToken, 'that was redacted');
});

client.on('error', e => {
    console.log(regToken, 'that was redacted');
});


client.on('error', console.error);

   client.login(ayarlar.token)
  .then(function() {
    console.log('[Token-Log] Token doğru bir şekilde çalışıyor.')

  }, function(err) {
    console.log("[ERROR] Token'de bir hata oluştu: " + err)
   })
