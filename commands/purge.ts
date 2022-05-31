import { ICommand } from "wokcommands"

module.exports = {
  category: 'Moderation',
  description: 'Purges Multipule Messages!',

  maxArgs: 1,
  expectedArgs: '[amount]',

  guildOnly: true,
  permissions: ['ADMINISTRATOR'],

  slash: 'both', 
  testOnly: false,

  callback:  async ({ message, interaction, channel, args  }) => {
    const amount = parseInt(args.shift()!)

    if (message) {
      await message.delete()
    }

    const { size } = await channel.bulkDelete(amount, false)

    const reply = `Deleted ${size} Message(s)!`

    if (interaction) {
      return reply
    }
  } 

} as ICommand