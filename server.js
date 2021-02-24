let Discord = require("discord.js");
let client = new Discord.Client();

const {
  DISCORD_TOKEN = '',
} = process.env;

const fridays = [
  "https://cdn.discordapp.com/attachments/394954465746223106/797088441879232533/89894c996afc5a120c0703c88d7af3c1a978619e329b129bcba739c33de9ae27_1.mp4",
  "https://cdn.discordapp.com/attachments/394954465746223106/789518102299803678/video0.mp4"
];

client.on("message", message => {
  if (message.content === ".friday") {
    const attachment = new Discord.MessageAttachment(
      fridays[Math.floor(Math.random() * fridays.length)],
      "friday.mp4"
    );

    const embed = new Discord.MessageEmbed()
      .setTitle("Friday");

    message.channel.send(attachment).catch(console.error);
  }
});

client.login(DISCORD_TOKEN);