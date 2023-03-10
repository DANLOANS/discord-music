const {
    Player, MakeSong
} = require("../../Player.js"), Sr = require("youtube-sr").default, Dl = require("@distube/ytdl")

module.exports.run = async (client, message, args, Discord) => {
    let Value = args.join(" "),
        Channel = message.member.voice.channel,
        Queue = await client.queue.get(message.guild.id);
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    if (!Channel.joinable || !Channel.speakable) return message.channel.send("ข้อผิดพลาด: ช่องเสียงไม่สามารถเข้าร่วมหรือพูดได้!");
    if (!Value) return client.commands.get("help").run(client, message, ["play", client.token], Discord);

    await Sr.search(Value, {
        limit: 10
    }).then(async Data => {
        if (!Data || !Data[0].id) return message.channel.send("ข้อผิดพลาด: ไม่พบเพลง!");
        Data.length > 10 ? Data.length = 10 : null;
        const Mapped = await Data.map((S, I) => `${I + 1} | [${S.title.length > 50 ? `${S.title.slice(0, 50)}...` : S.title}](https://youtube.com/watch?v=${S.id})`),
            Filter = m => m.author.id === message.author.id;

        const Embed = new Discord.MessageEmbed()
            .setColor(client.Color)
            .setTitle("Please Choose")
            .setDescription(Mapped)
            .setFooter(`Please Select Betweent 1 - ${Data.length}, Time: 5 Minutes`)
            .setTimestamp();

        await message.channel.send(Embed);

        await message.channel.awaitMessages(Filter, {
            max: 1,
            time: 300000,
            errors: ["time"]
        }).then(async (Msg) => {
            Msg = Msg.first();
            let Content = Msg.content,
                Song;
            if (isNaN(Content) || parseInt(Content) < 1) return message.channel.send("ข้อผิดพลาด: ดัชนีไม่ถูกต้อง!");
            Content = parseInt(Content);
            if (Content - 1 > Data.length || !Data[Content - 1]) return message.channel.send("ข้อผิดพลาด: ดัชนีที่ไม่รู้จัก!");
            try {
                Song = await Dl.getInfo(`https://youtube.com/watch?v=${Data[Content - 1].id}`);
                Song = await MakeSong(Song.videoDetails, message, Song);
            } catch (e) {
                return message.channel.send("ข้อผิดพลาด: ไม่ทราบ").then(() => console.log(e));
            };
            if (Queue) {
                await Queue.Songs.push(Song);
                const QueueAdd = new Discord.MessageEmbed()
                    .setColor(client.Color)
                    .setThumbnail(Song.Thumbnail)
                    .setAuthor("Song Added", message.author.avatarURL({
                        dynamic: true
                    }))
                    .setDescription(`[${Song.Title}](${Song.Link})` + " เพิ่มในคิวแล้ว!")
                    .setTimestamp();
                return message.channel.send(QueueAdd);
            };

            try {
                Connection = await Channel.join();
                await Connection.voice.setSelfDeaf(true);
            } catch (e) {
                console.log(e);
                return message.channel.send("ข้อผิดพลาด: ไม่สามารถเข้าร่วมช่องเสียง!");
            };

            await client.queue.set(message.guild.id, {
                Text: message.channel,
                Voice: Channel,
                Connection,
                Volume: 100,
                Filters: {},
                Songs: [Song],
                Steam: null,
                Loop: false,
                Day: false,
                Playing: true
            });

            Queue = await client.queue.get(message.guild.id);

            try {
                await Player(client, message, {
                    Song: Song
                });
            } catch (e) {
                await Channel.leave(), await client.queue.delete(message.guild.id), await console.log(e);
                return message.channel.send("ข้อผิดพลาด: มีบางอย่างผิดพลาด โปรดลองอีกครั้งในภายหลัง!");
            };
        }).catch((e) => {
            return message.channel.send("ข้อผิดพลาด: เกินขีดจำกัดเวลา - ยกเลิกแล้ว").then(() => console.log(e));
        });
    }).catch((e) => {
        return message.channel.send("ข้อผิดพลาด: มีบางอย่างผิดพลาด โปรดลองอีกครั้งในภายหลัง!").then(() => console.log(e));
    });
};

module.exports.help = {
    name: "search",
    aliases: ["sh"],
    cooldown: 100,
    category: "Music",
    description: "ค้นหาเพลงใน Youtube!",
    usage: "Search <Title>",
    examples: ["play attention", "play we don't talk anymore"]
};