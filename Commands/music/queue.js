module.exports.run = async (client, message, args) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue || !Queue.Songs) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");

    const Songs = await Queue.Songs.map((S, I) => {
        const Position = (I + 1) == 1 ? "กำลังเล่น" : (I - 1) == 0 ? 1 : I + 1;
        return `${Position} | ${S.Title.length > 50 ? `${S.Title.slice(0, 50)}...` : S.Title}${Position == "กำลังเล่น" ? "\n" : ""}`;
    }).join("\n");

    if (!Songs) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");

    return message.channel.send(Songs, {
        split: {
            char: "\n"
        }
    });
};

module.exports.help = {
    name: "queue",
    aliases: ["q", "qu"],
    cooldown: 100,
    category: "Music",
    description: "รับคิวเพลง!",
    usage: "Queue",
    examples: ["queue"]
};