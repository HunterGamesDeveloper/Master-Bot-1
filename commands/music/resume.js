const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Resume the current paused song',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Присоединитесь к каналу и попробуйте снова');

    if (
      typeof message.guild.musicData.songDispatcher == 'не определено' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('Там нет никакой песни, играющей прямо сейчас!');
    }

    message.say('Песня возобновлена :play_pause:');

    message.guild.musicData.songDispatcher.resume();
  }
};
