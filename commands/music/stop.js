const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Leaves voice channel if in one'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Присоединитесь к каналу и повторите попытку');

    if (
      typeof message.guild.musicData.songDispatcher == 'не определено' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Я не проигрываю музыку в данный момент!');
    }
    if (!message.guild.musicData.queue)
      return message.say('В очереди нет никаких песен');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0;
    return;
  }
};
