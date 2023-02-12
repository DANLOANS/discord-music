const {
    Player
} = require("../../Player.js");

module.exports.run = async (client, message, args) => {
    const Channel = message.member.voice.channel;
    if (!Channel) return message.channel.send("ข้อผิดพลาด: ไม่มีช่องเสียง!");
    let Queue = await client.queue.get(message.guild.id),
        Connection;
    if (!Queue) return message.channel.send("ข้อผิดพลาด: ไม่มีคิว โปรดเพิ่มเพลงโดยใช้คำสั่งเล่นและค้นหา!");
    if (Queue.Voice.id != Channel.id) return message.channel.send("ข้อผิดพลาด: ต้องอยู่ในช่องเสียงเดียวกัน!");
    const Wait = await message.channel.send("ทำความสะอาด...");
    await message.guild.voice.kick(), await client.queue.delete(message.guild.id);
    await Wait.edit("ออกจากช่องเสียงและคิวที่ถูกลบออกจากฐานข้อมูลเรียบร้อยแล้ว");

    Wait.edit("การกำหนดค่า...");

    setTimeout(async () => {
        try {
            Connection = await Channel.join();
            await Connection.voice.setSelfDeaf(true);
            Queue["Connection"] = Connection;
        } catch (e) {
            console.log(e);
            return Wait.edit("การกำหนดค่าล้มเหลว - ไม่สามารถเข้าร่วมช่องเสียงได้!");
        };
        await Wait.edit("การกำหนดค่าสำเร็จ - เข้าร่วม The Voice Channel");
        await client.queue.set(message.guild.id, Queue);
        try {
            await Player(client, message, {
                Song: Queue.Songs[0]
            });
        } catch (e) {
            console.log(e);
            return Wait.edit("การกำหนดค่าล้มเหลว - ข้อผิดพลาดของผู้เล่น");
        };
        await Wait.edit("การกำหนดค่าสำเร็จ - ผู้เล่นกำลังทำงาน").then((M) => M.delete({
            timeout: 100
        }));
        return message.react("✅");
    }, 3000);
};

module.exports.help = {
    name: "clean",
    aliases: ["cn"],
    cooldown: 100,
    category: "Music",
    description: "ทำให้เพลงชัดเจนยิ่งขึ้น!",
    usage: "Clean",
    examples: ["clean"]
};