const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song'],
      memberName: 'skip',
      group: 'music',
      description: 'Skip the current playing song',
      guildOnly: true
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Присоединитесь к каналу и попробуйте снова');

    if (
      typeof message.guild.musicData.songDispatcher == 'неопределено' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Там нет никакой песни, играющей прямо сейчас!');
    }
    message.guild.musicData.songDispatcher.end();
  }
};
