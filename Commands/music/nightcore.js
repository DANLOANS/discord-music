const {
    Player
} = require("../../Player.js");

module.exports.run = async (client, message, args, Discord) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");

    const Embed = new Discord.MessageEmbed()
        .setColor(client.Color)
        .setAuthor("Nightcore", message.author.avatarURL({
            dynamic: true
        }))
        .setDescription(`Nightcore Filter Has Been ${Queue.Filters["nightcore"] ? "Disabled (Song May Backward)" : "เปิดใช้งาน (เพลงอาจจะอยู่ข้างหน้า)"}!`)
        .setTimestamp();

    Queue.Filters["nightcore"] = !Queue.Filters["nightcore"]

    await Player(client, message, {
        Filter: true,
        Song: Queue.Songs[0]
    });

    return message.channel.send(Embed);
};

module.exports.help = {
    name: "nightcore",
    aliases: ["nc"],
    cooldown: 100,
    category: "Music",
    description: "เพิ่ม/ลบ Nightcore Filter ไปยัง/ออกจากเพลงที่กำลังเล่นอยู่!",
    usage: "Nightcore",
    examples: ["nightcore"]
};