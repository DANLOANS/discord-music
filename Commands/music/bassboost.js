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
        .setAuthor("Bassboost", message.author.avatarURL({
            dynamic: true
        }))
        .setDescription(`Bassboost Filter Has Been ${Queue.Filters["bassboost"] ? "พิการ (เพลงอาจจะย้อนหลัง)" : "เปิดใช้งาน (เพลงอาจจะอยู่ข้างหน้า)"}!`)
        .setTimestamp();

    Queue.Filters["bassboost"] = !Queue.Filters["bassboost"]

    await Player(client, message, {
        Filter: true,
        Song: Queue.Songs[0]
    });

    return message.channel.send(Embed);
};

module.exports.help = {
    name: "bassboost",
    aliases: ["bb"],
    cooldown: 100,
    category: "Music",
    description: "เพิ่ม/ลบ Bassboost Filter ไปที่/ออกจากเพลงที่กำลังเล่นอยู่!",
    usage: "Bassboost",
    examples: ["bassboost"]
};