import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import 'dotenv/config'

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', () => {

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        
        messagesPath: '',
        
        showWarns: true,

        typeScript: true,
        
        delErrMsgCooldown: -1,
                
        ignoreBots: false,
        
        ephemeral: true,
        
        dbOptions: {
            keepAlive: true
        },
        
        testServers: ['958001559281729578'],
        
        botOwners: ['946113064196006029', '792509241901842523'],
        
        disabledDefaultCommands: [
            'help',
            'command',
            'language',
            'prefix',
            'requiredrole'
        ],
        
        mongoUri: process.env.MONGO_URI,
        
        debug: false
    })

        .setDefaultPrefix('lm!')
        
        .setColor(0xff0000)
})

client.login(process.env.TOKEN)