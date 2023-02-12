module.exports.run = async (client, message, args, Discord) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");
    if (Queue.Playing) return message.channel.send("ข้อผิดพลาด: ไม่ได้หยุดชั่วคราว!");

    Queue.Playing = true;
    Queue.Connection.dispatcher.resume();

    try {
        await message.react("✅");
    } catch (e) {
        return message.channel.send("ข้อผิดพลาด: ไม่ทราบ").then(() => console.log(e));
    };
};

module.exports.help = {
    name: "resume",
    aliases: ["r", "rs"],
    cooldown: 100,
    category: "Music",
    description: "ประวัติเพลงที่หยุดชั่วคราวในขณะนี้!",
    usage: "Resume",
    examples: ["resume"]
};