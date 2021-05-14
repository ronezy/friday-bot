const Discord = require("discord.js");

let client = new Discord.Client();

const {
  DISCORD_TOKEN = '',
  DISCORD_CHANNEL = 'general',
} = process.env;

const fridays = [
  "https://cdn.discordapp.com/attachments/394954465746223106/797088441879232533/89894c996afc5a120c0703c88d7af3c1a978619e329b129bcba739c33de9ae27_1.mp4",
  "https://cdn.discordapp.com/attachments/394954465746223106/789518102299803678/video0.mp4"
];

client.on("ready", async () => {
    client.user.setActivity("memes on friday", { type: "STREAMING" });

    const attachment = new Discord.MessageAttachment(
        fridays[Math.floor(Math.random() * fridays.length)],
        "friday.mp4"
    );

    const channels = client.guilds.cache.map((guild) => Array.from(guild.channels.cache.values())).flat(2);

    if (channels.length === 0) {
        console.error('No channels found');
        return;
    }

    const promises = channels.map((channel) => {
        if (channel.type !== 'text' || channel.name !== DISCORD_CHANNEL) {
            return null;
        }
        return channel.send(attachment);
    });

    await Promise.allSettled(promises);

    process.exit(0);
});

client.login(DISCORD_TOKEN);