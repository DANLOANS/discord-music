module.exports.run = async (client, message, args) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    if (Channel.full) return message.channel.send("ข้อผิดพลาด: ช่องเต็ม!");
    if (!Channel.joinable || !Channel.speakable) return message.channel.send("ข้อผิดพลาด: ไม่สามารถเข้าร่วมหรือพูดได้!");
    if (message.guild.me.voice.channel) return message.channel.send(`Error: Already Connected To ${message.guild.me.voice.channel.id == Channel.id ? "Your" : "A"} Voice Channel!`);

    try {
        await Channel.join().then((Connection) => {
            Connection.voice.setSelfDeaf(true);
            message.react("✅");
        });
    } catch (e) {
        return message.channel.send("ข้อผิดพลาด: ไม่ทราบ").then(() => console.log(e));
    };
};

module.exports.help = {
    name: "join",
    aliases: ["joinvc", "jn"],
    cooldown: 100,
    category: "Music",
    description: "เข้าร่วมช่องเสียง!",
    usage: "Join",
    examples: ["join"]
};