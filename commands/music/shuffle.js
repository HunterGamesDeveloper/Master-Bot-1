const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class ShuffleQueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shuffle',
      memberName: 'shuffle',
      group: 'music',
      description: 'Shuffle the song queue',
      guildOnly: true
    });
  }
  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Там нет никакой песни, играющей прямо сейчас!');

    if (
      typeof message.guild.musicData.songDispatcher == 'неопределено' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Там нет никакой песни, играющей прямо сейчас!');
    }

    if (message.guild.musicData.queue.length < 1)
      return message.say('В очереди нет песен');

    shuffleQueue(message.guild.musicData.queue);

    const titleArray = [];
    message.guild.musicData.queue.map(obj => {
      titleArray.push(obj.title);
    });
    var queueEmbed = new MessageEmbed()
      .setColor('#ff7373')
      .setTitle('Новая музыкальная очередь');
    for (let i = 0; i < titleArray.length; i++) {
      queueEmbed.addField(`${i + 1}:`, `${titleArray[i]}`);
    }
    return message.say(queueEmbed);
  }
};

function shuffleQueue(queue) {
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
}
