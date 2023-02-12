const {
    Player,
    Filters
} = require("../../Player.js");

module.exports.run = async (client, message, args, Discord) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");
    let Filter = args[0],
        All = await Object.keys(await Filters());
    if (!Filter) return message.channel.send("โปรดระบุชื่อตัวกรอง -" + All.map(E => E[0].toUpperCase() + E.slice(1)).join(", "));
    if (!All.includes(Filter.toLowerCase())) return message.channel.send("ไม่พบตัวกรอง -" + Filter);
    if (Object.keys(Queue.Filters).length >= 3 && !Queue.Filters[Filter.toLowerCase()]) return message.channel.send("ข้อผิดพลาด: เกินขีดจำกัดตัวกรอง - 3");

    Filter = Filter.toLowerCase();

    const Embed = new Discord.MessageEmbed()
        .setColor(client.Color)
        .setAuthor(Filter[0].toUpperCase() + Filter.slice(1), message.author.avatarURL({
            dynamic: true
        }))
        .setDescription(`${Filter[0].toUpperCase() + Filter.slice(1)} Filter Has Been ${Queue.Filters[Filter] ? "พิการ (เพลงอาจจะย้อนหลัง)" : "เปิดใช้งาน (เพลงอาจจะอยู่ข้างหน้า)"}!`)
        .setTimestamp();

    Queue.Filters[Filter] = !Queue.Filters[Filter];

    await Player(client, message, {
        Filter: true,
        Song: Queue.Songs[0]
    });

    return message.channel.send(Embed);
};

module.exports.help = {
    name: "filters",
    aliases: ["modifiers", "newfilter"],
    cooldown: 100,
    category: "Music",
    description: "เพิ่ม/ลบตัวกรองเพลงไปยัง/ออกจากเพลงที่กำลังเล่นอยู่!",
    usage: "Filters <Name>",
    examples: ["filters bassboost", "filters superfast"]
};