module.exports.run = async (client, message, args) => {
    const Channel = message.member.voice.channel,
        Bot = message.guild.me.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    if (!Bot) return message.channel.send("ข้อผิดพลาด: ไม่มี Bot Voice Channel!");
    if (Bot.id != Channel.id) return message.channel.send("ข้อผิดพลาด: ช่องเสียงต่างกัน!");
    if (!message.member.hasPermission("MANAGE_CHANNELS") && Bot.members.length > 2) return message.channel.send("ข้อผิดพลาด: คำขอถูกยกเลิกเนื่องจากสมาชิก 2+ คน");

    try {
        await Bot.leave();
        await message.react("✅");
    } catch (e) {
        return message.channel.send("ข้อผิดพลาด: ไม่ทราบ").then(() => console.log(e));
    };
};

module.exports.help = {
    name: "leave",
    aliases: ["leavevc", "lv"],
    cooldown: 100,
    category: "Music",
    description: "ออกจากช่องเสียง!",
    usage: "Leave",
    examples: ["leave"]
};