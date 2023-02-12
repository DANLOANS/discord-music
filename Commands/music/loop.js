module.exports.run = async (client, message, args, Discord) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");

    Queue.Loop = Queue.Loop ? false : true;

    const Embed = new Discord.MessageEmbed()
        .setColor(client.Color)
        .setAuthor(`${Queue.Loop ? "On" : "Off"}`, message.author.avatarURL({
            dynamic: true
        }))
        .setDescription(`Loop Has Been ${Queue.Loop ? "Enabled" : "Disabled"}!`)
        .setTimestamp();

    return message.channel.send(Embed);
};

module.exports.help = {
    name: "loop",
    aliases: ["lp", "l"],
    cooldown: 100,
    category: "Music",
    description: "On Loop หรือ Off Loop!",
    usage: "Loop",
    examples: ["loop"]
};