module.exports.run = (client, message) => {
    return message.channel.send(`Pong - ${client.ws.ping}ms`);
};

module.exports.help = {
    name: "ping",
    aliases: ["ping"],
    cooldown: 100,
    category: "Other",
    description: "รับบอทปิง!",
    usage: "Ping",
    examples: ["ping"]
};