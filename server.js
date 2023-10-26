const Discord = require("discord.js");
const moment = require('moment-timezone');

moment.tz.setDefault('Europe/Helsinki');

let client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages] });

const {
    DISCORD_TOKEN = '(discord token here)',
    DISCORD_CHANNEL = '(discord channel here)',
} = process.env;

const fridayType = [
    "normal",
    "normal",
    "firegator",
    "normal",
    "flat",
    "normal",
    "normal"
];

const fridays = [
    "https://cdn.discordapp.com/attachments/394954465746223106/797088441879232533/89894c996afc5a120c0703c88d7af3c1a978619e329b129bcba739c33de9ae27_1.mp4",
    "https://cdn.discordapp.com/attachments/394954465746223106/789518102299803678/video0.mp4",
    "https://cdn.discordapp.com/attachments/394954465746223106/1064601080891195422/Y2Mate.is_-_Fire_Gator_Friday_guys-dAOapNthDs8-480p-1659855004124.mp4",
    "https://cdn.discordapp.com/attachments/394954465746223106/1064601556743376966/Y2Mate.is_-_Martti_Servo_-_Viikonloppu-vkVidHRkF88-480p-1657577476045.mp4",
    "https://cdn.discordapp.com/attachments/394954465746223106/1064601890169557102/Y2Mate.is_-_its_fat_fuck_friday_you_fucking_loser-MLESXo2YINY-1080p-1654757482535.mp4",
    "https://cdn.discordapp.com/attachments/394954465746223106/1064602786907566080/vV241RMWWJ-TaLYO.mp4",
    "https://cdn.discordapp.com/attachments/394954465746223106/1064603876097007686/Y2Mate.is_-_When_is_Friday_meme_Jojo_bizarre_adventure_Dio_Brando-mqLBL474aMk-720p-1656035210158.mp4",
	
];

const thursday = [
	"https://cdn.discordapp.com/attachments/297865936071950337/824403661866139668/Wednesday.mp4"
	
];

const isFriday = () => moment().day() === 5;
const isFridayAt1700 = () => moment().day() === 5 && moment().hours() === 17 && moment().minute() === 0;
const isMondayAt0000 = () => moment().day() === 1 && moment().hours() === 0 && moment().minute() === 0;
const isMondayAt2359 = () => moment().day() === 1 && moment().hours() === 23 && moment().minute() === 59;
const isThursdayAt1000 = () => moment().day() === 4 && moment().hours() === 10 && moment().minute() === 0;
const randomStatusType = () => [Discord.ActivityType.Watching, Discord.ActivityType.Playing, Discord.ActivityType.Listening][Math.floor(Math.random() * 3)];

const sendFridayMp4 = async () => {
    const index = Math.floor(Math.random() * fridays.length);

    const attachment = new Discord.AttachmentBuilder()
        .setFile(fridays[index], 'friday.mp4');

    const channels = client.guilds.cache.map((guild) => Array.from(guild.channels.cache.values())).flat(2);

    if (channels.length === 0) {
        console.error('No channels found');
        return { index, success: true };
    }

    const channelsToSend = channels.filter((channel) => channel.type === Discord.ChannelType.GuildText && channel.name === DISCORD_CHANNEL);
    console.log();

    const promises = channelsToSend.map((channel) => {
        return channel.send({ files: [attachment] });
    });

    const results = await Promise.allSettled(promises);

    let success = true;

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`friday.mp4 sent to channel ${channelsToSend[index].guild.name}/${channelsToSend[index].name}: OK`);
        } else {
            success = false;
            try {
                console.error(`Error sending friday.mp4 to channel ${channelsToSend[index].guild.name}/${channelsToSend[index].name}: `, result.reason);
                console.error(`(stringified): `, JSON.stringify(result.reason));
            } catch (err) {
                console.error('stringification error: ', err);
            }
        }
    });

    return { index, success };
};

const sendThursdayMp4 = async () => {
    const index = Math.floor(Math.random() * thursday.length);

    const attachment = new Discord.AttachmentBuilder()
        .setFile(thursday[index], 'Thursday.mp4');

    const channels = client.guilds.cache.map((guild) => Array.from(guild.channels.cache.values())).flat(2);

    if (channels.length === 0) {
        console.error('No channels found');
        return { index, success: true };
    }

    const channelsToSend = channels.filter((channel) => channel.type === Discord.ChannelType.GuildText && channel.name === DISCORD_CHANNEL);
    console.log();

    const promises = channelsToSend.map((channel) => {
        return channel.send({ files: [attachment] });
    });

    const results = await Promise.allSettled(promises);

    let success = true;

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Thursday.mp4 sent to channel ${channelsToSend[index].guild.name}/${channelsToSend[index].name}: OK`);
        } else {
            success = false;
            try {
                console.error(`Error sending Thursday.mp4 to channel ${channelsToSend[index].guild.name}/${channelsToSend[index].name}: `, result.reason);
                console.error(`(stringified): `, JSON.stringify(result.reason));
            } catch (err) {
                console.error('stringification error: ', err);
            }
        }
    });

    return { index, success };
};

client.on("ready", async () => {
    let hasSent = false;
	let hasSentThursday = false;

    console.log('Friday bot ready');

    try {
		if (isFriday()) {
			await client.user.setPresence({
				activities: [{ name: 'memes on friday', type: randomStatusType() }],
				status: 'online',
			});
		} else {
			await client.user.setPresence({
				activities: [{ name: 'for the next friday', type: Discord.ActivityType.Watching }],
				status: 'idle',
			});
		}

        while(true) {
            await new Promise(r => setTimeout(r, 1000));

            if (isMondayAt0000()) {
                await client.user.setPresence({
                    activities: [{ name: 'for friday, just a week away', type: Discord.ActivityType.Watching }],
                    status: 'idle',
                });
                await new Promise(r => setTimeout(r, 10 * 1000));
            } else if (isMondayAt2359()) {
                await client.user.setPresence({
                    activities: [{ name: 'for the next friday', type: Discord.ActivityType.Watching }],
                    status: 'idle',
                });
                await new Promise(r => setTimeout(r, 10 * 1000));
            }
			
			if (!isThursdayAt1000()){
				hasSentThursday = false;
			}
			else if(!hasSentThursday){
				hasSentThursday = true;
			}

            if (!isFridayAt1700()) {
                hasSent = false;
                continue;
            }

            if (hasSent) {
                continue;
            }

            console.log('Sending friday.mp4');
            const { index, success } = await sendFridayMp4();

            if (success) {
                switch (fridayType[index]) {
                    case "normal": {
                        await client.user.setPresence({
                            activities: [{ name: 'memes on friday', type: randomStatusType() }],
                            status: 'online',
                        });
                        break;
                    }
                    case "firegator": {
                        await client.user.setPresence({
                            activities: [{ name: 'Highlander (The One)', type: Discord.ActivityType.Listening }],
                            status: 'online',
                        });
                        break;
                    }
                    case "flat": {
                        await client.user.setPresence({
                            activities: [{ name: 'Flat fuck friday', type: Discord.ActivityType.Playing }],
                            status: 'online',
                        });
                        break;
                    }
                }
            } else {
                await client.user.setPresence({
                    activities: [{ name: 'the error message in logs', type: Discord.ActivityType.Watching }],
                    status: 'dnd',
                });
            }

            hasSent = true;
            continue;
        }
    } catch (err) {
        console.error('Error occurred: ', err);
        console.error('(stringified): ', JSON.stringify(err));
    }
});

client.login(DISCORD_TOKEN);
