module.exports.run = async (client, message, args) => {
    const Channel = message.member.voice.channel,
        Bot = message.guild.me.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");
    if (!message.member.hasPermission("MANAGE_MESSAGES") && Bot.members.length > 2) return message.channel.send("ข้อผิดพลาด: คำขอถูกยกเลิกเนื่องจากสมาชิก 2+ คน");

    Queue.Songs = [];
    await Queue.Connection.dispatcher.end();

    try {
        await message.react("✅");
    } catch (e) {
        return message.channel.send("ข้อผิดพลาด: ไม่ทราบ").then(() => console.log(e));
    };
};

module.exports.help = {
    name: "clearqueue",
    aliases: ["deletequeue", "cq", "dq"],
    cooldown: 100,
    category: "Music",
    description: "เคลียร์คิวเพลง!",
    usage: "Clearqueue",
    examples: ["clearqueue"]
};