const {
    OwnerID
} = require("../../config.js");

module.exports.run = (client, message, args, Discord) => {
    const Link = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`,
        Owner = `<@${OwnerID || "705433362428461099"}>`,
        Developer = "Legendary Emoji#1742";

    const Embed = new Discord.MessageEmbed()
        .setColor(client.Color)
        .setAuthor("Invite", message.author.avatarURL({
            dynamic: true
        }))
        .addField("Link", `[Click Me](${Link})`, true)
        .addField("Source Code (Github)", "[Click Me](https://github.com/LegendaryEmoji/Music-Bot/)", true)
        .addField("Owner", Owner, true)
        .addField("Developer", Developer, true)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

    return message.channel.send(Embed);
};

module.exports.help = {
    name: "invite",
    aliases: ["iv", "info"],
    cooldown: 100,
    category: "Other",
    description: "รับลิงก์เชิญ Bot และข้อมูลอื่น ๆ !",
    usage: "Invite",
    examples: ["invite"]
};