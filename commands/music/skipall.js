const { Command } = require('discord.js-commando');

module.exports = class SkipAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipall',
      aliases: ['skip-all'],
      memberName: 'skipall',
      group: 'music',
      description: 'Skip all songs in queue',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Присоединитесь к каналу и попробуйте снова');

    if (
      typeof message.guild.musicData.songDispatcher == 'неопределено' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Там нет никакой песни, играющей прямо сейчас!');
    }
    if (!message.guild.musicData.queue)
      return message.say('В очереди нет песен');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0; // clear queue
    return;
  }
};
