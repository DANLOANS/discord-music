module.exports.run = async (client, message, args, Discord) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("ข้อผิดพลาด: ไม่มีการอนุญาต (จัดการข้อความ)");

    const Prefix = client.Prefix,
        NewPrefix = args[0];

    if (!NewPrefix) return client.commands.get("help").run(client, message, ["setprefix", client.token], Discord);
    if (Prefix == NewPrefix) return message.channel.send("ข้อผิดพลาด: คำนำหน้าเดียวกัน");
    if (NewPrefix.length > 10) throw new Error("ข้อผิดพลาด: เกินขีดจำกัดความยาวของคำนำหน้า (10)");

    await client.Db.set(`Prefix_${message.guild.id}`, NewPrefix);

    const Embed = new Discord.MessageEmbed()
    .setColor(client.Color)
    .setAuthor("Prefix", message.author.avatarURL({ dynamic: true }))
    .setDescription(`ตั้งค่าคำนำหน้าแล้ว - ${NewPrefix}`)
    .setFooter(`การร้องขอจาก ${message.author.username}`)
    .setTimestamp();

    return message.channel.send(Embed);
};

module.exports.help = {
    name: "setprefix",
    aliases: ["sp"],
    cooldown: 100,
    category: "Config",
    description: "ตั้งค่าคำนำหน้าของเซิร์ฟเวอร์!",
    usage: "Setprefix <Prefix>",
    examples: ["setprefix !", "setprefix P!"]
};