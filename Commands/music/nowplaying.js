module.exports.run = async (client, message, args, Discord) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue || !Queue.Songs) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");

    const Song = Queue.Songs[0],
        Type = ["YT", "SR"].includes(Song.Type) ? "Youtube" : Song.Type == "SC" ? "SoundCloud" : ["SP", "SPPL"].includes(Song.Type) ? "Spotify" : "Facebook";

    const Embed = new Discord.MessageEmbed()
        .setColor(client.Color)
        .setAuthor("กำลังเล่น", message.author.avatarURL({
            dynamic: true
        }))
        .setThumbnail(Song.Thumbnail)
        .setDescription(`Source - ${Type}\nTitle - [${Song.Title}](${Song.Link})\nDuration - ${Song.Duration}\nAdded By - ${Song.Req}`)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

    return message.channel.send(Embed);
};

module.exports.help = {
    name: "nowplaying",
    aliases: ["np"],
    cooldown: 100,
    category: "Music",
    description: "รับข้อมูลเพลงที่กำลังเล่นอยู่!",
    usage: "Nowplaying",
    examples: ["nowplaying"]
};