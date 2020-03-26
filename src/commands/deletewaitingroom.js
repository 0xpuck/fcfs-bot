const { Command } = require('discord-akairo');

class DeleteWaitingRoomCommand extends Command {
  constructor() {
    super('deletewaitingroom', {
      aliases: ['deletewaitingroom', 'dwr'],
      split: 'quoted',
      channel: 'guild',
      userPermissions: ['ADMINISTRATOR'],
      args: [
        {
          id: 'monitorChannel',
          type: 'string',
        }
      ]
    });
  }

  async exec(message, args) {
    let ds = this.client.datasource;
    let server = ds.servers[message.guild.id];

    if (!server.monitoredChannels[args.monitorChannel]) {
      return message.channel.send(`Error: couldn't find a channel with ID \`${args.monitorChannel}\` that's being monitored!`);
    }

    ds.removeMonitor(args.monitorChannel);

    message.channel.send('Successfully deleted!');
  }
}

module.exports = DeleteWaitingRoomCommand;