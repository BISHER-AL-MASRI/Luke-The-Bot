import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans A User!',

    permissions: ['BAN_MEMBERS'],

    slash: 'both',

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members!.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            return 'Please Tag Someone Who You Wish To Ban!'
        }

        if (!target.kickable) {
            return {
                custom: true,
                content: `Cannot Ban That User <@${target.id}!`,
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7,
        })

        return {
            custom: true,
            content: `You banned <@${target.id}>`,
            ephemeral: true
        }
        }
} as ICommand