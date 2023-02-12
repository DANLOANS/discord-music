module.exports.run = async (client, message, args, Discord) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    const Queue = client.queue.get(message.guild.id);
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");
    let NewVolume = args[0];

    const Embed = new Discord.MessageEmbed()
        .setColor(client.Color)
        .setAuthor("Volume", message.author.avatarURL({
            dynamic: true
        }))
        .setDescription(`Current Volume - ${Queue.Volume}`)
        .setTimestamp();

    if (!NewVolume) return message.channel.send(Embed);
    if (isNaN(NewVolume) || parseInt(NewVolume) < 1) return message.channel.send("ข้อผิดพลาด: ระบุไดรฟ์ข้อมูลไม่ถูกต้อง!");
    NewVolume = parseInt(NewVolume);
    if (NewVolume > 150) return message.channel.send("ข้อผิดพลาด: เกินขีดจำกัดปริมาณ - 150");
    if (NewVolume == Queue.Volume) return message.channel.send(`Error: Already ${NewVolume}!`);

    Queue.Volume = NewVolume;
    Queue.Connection.dispatcher.setVolumeLogarithmic(Queue.Volume / 100);

    const Embeded = new Discord.MessageEmbed()
        .setColor(client.Color)
        .setAuthor("Volume", message.author.avatarURL({
            dynamic: true
        }))
        .setDescription("ระดับเสียงเพลงมีการเปลี่ยนแปลง -" + Queue.Volume + "!")
        .setTimestamp();

    return message.channel.send(Embeded);
};

module.exports.help = {
    name: "volume",
    aliases: ["v", "vl", "vol"],
    cooldown: 100,
    category: "Music",
    description: "ดูหรือเปลี่ยนระดับเสียงเพลงที่กำลังเล่นอยู่!",
    usage: "Volume | <New Volume>",
    examples: ["volume", "volume 124", "volume 50", "volume 136"]
};