module.exports.run = async (client, message, args, Discord) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");

    const Current = await Queue.Songs.shift();
    Queue.Songs = Queue.Songs.sort(() => Math.random() - 0.5);
    await Queue.Songs.unshift(Current);

    try {
        await message.react("✅");
    } catch (e) {
        return message.channel.send("ข้อผิดพลาด: ไม่ทราบ").then(() => console.log(e));
    };
};

module.exports.help = {
    name: "shuffle",
    aliases: ["sfl"],
    cooldown: 100,
    category: "Music",
    description: "สุ่มคิวเพลง!",
    usage: "Shuffle",
    examples: ["shuffle"]
};