let { Command } = require("../index")
let axios = require("axios")

module.exports = class Cmd extends Command {

    constructor() {
    super()

        this.name = "eval"
        this.aliases = ["ev"]
        this.admOnly = true

    }

    run (client, {channel, author}, arg) {
        if (author.id !== 'your id') return;
        try {
        let evaluated = eval(arg.join(" "))
        channel.send(`\`\`\`js\n${evaluated}\`\`\``)
        } catch(err) {
        channel.send(`\`\`\`js\n${err}\`\`\``)
        }
    }

}
