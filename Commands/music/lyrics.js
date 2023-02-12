const Finder = require("lyrics-finder");

module.exports.run = async (client, message, args, Discord) => {
    const Queue = client.queue.get(message.guild.id);
    if (!Queue && !args[0]) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");
    let Lyric, Thing = Queue ? Queue.Songs[0].Title : args.join(" "), NoSong = false;

    try {
      Lyric = await Finder(Thing, "");
      if (!Lyric && Queue && args[0]) {
        Lyric = await Finder(args.join(" "));
        NoSong = true;
      };
      if (!Lyric) return message.channel.send(`No Lyrics Found - ${NoSong ? args.join(" ") : Thing}`); 
    } catch (e) {
      return message.channel.send(`No Lyrics Found - ${Thing}`);
    };

    Lyric = await Lyric.replace(/(.{2021})/g, "\n1\n");

    return message.channel.send(Lyric, {
        split: {
            char: "\n"
        }
    });
};

module.exports.help = {
    name: "lyrics",
    aliases: ["lyric", "ly"],
    cooldown: 100,
    category: "Music",
    description: "แสดงเนื้อเพลง",
    usage: "Lyrics | <Title>",
    examples: ["lyrics", "lyrics we don't talk anymore", "lyrics shape of you", "lyrics despacito"]
};