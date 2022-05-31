import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks A User!',

    permissions: ['KICK_MEMBERS'],

    slash: 'both',

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members!.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            return 'Please Tag Someone Who You Wish To Kick!'
        }

        if (!target.kickable) {
            return {
                custom: true,
                content: `Cannot Kick That <@${target.id}> !`,
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return {
            custom: true,
            content: `You kicked <@${target.id}>`,
            ephemeral: true
        }
        }
} as ICommand