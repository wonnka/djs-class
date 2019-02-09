let { Client, Collection, RichEmbed } = require("discord.js")
let Discord = require("discord.js")
let { readdirSync, readFileSync } = require("fs")
let { join } = require("path")
let chalk = require("chalk")
let axios = require("axios")

class Index extends Client {

    constructor() {
    super()

        this.prefix = '!'
        this.cmds = []
        this.load(join(__dirname, "./commands"))
        
    }

    log (colour, content) { console.log(chalk.keyword(colour)(content)) }

    load (folder) {

        readdirSync(folder).forEach(file => {
            let Cmd = require(`${folder}/${file}`)
            this.cmds.push(new Cmd())
        })
        return this;

    }

}

class Command {
    
    constructor(bot) {

        this.Embed = new RichEmbed()
        this.games = new Collection()
        this.category = String
        this.help = String
        this.admOnly = Boolean
        this.manu = Boolean

    }
    
}

module.exports = { Index, Command }

let client = new Index()

client.on("ready", () => client.log("white", `${readFileSync("./title.txt", 'utf8').toString()}`))

client.on("message", message => {
    if (!message.content.startsWith(client.prefix) || message.author.bot || !message.guild) return;
    let arg = message.content.slice(client.prefix.length).trim().split(/ +/g)
    let cmds = client.cmds.filter(cmd => cmd.name == arg[0] || cmd.aliases.includes(arg[0]))[0]
    arg = arg.slice(1)
    cmds.run(client, message, arg)
})

client.login("")
