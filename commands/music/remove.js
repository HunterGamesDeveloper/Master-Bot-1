const { Command } = require('discord.js-commando');

module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
      group: 'music',
      description: 'Remove a specific song from queue',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt: 'What song number do you want to remove from queue?',
          type: 'integer'
        }
      ]
    });
  }
  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Пожалуйста, введите правильный номер песни');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Присоединитесь к каналу и попробуйте снова');

    if (
      typeof message.guild.musicData.songDispatcher == 'не определено' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Там нет никакой песни, играющей прямо сейчас!');
    }

    message.guild.musicData.queue.splice(songNumber - 1, 1);
    return message.say(`Удален номер песни ${songNumber} из очереди`);
  }
};
