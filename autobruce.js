const readline = require('readline-sync')
const chalk = require('chalk')
const { foul, status, statusBar, log, banner, help } = require('./display')
const game = require('./game')
const { Character } = require('./character')

let quit = false

isCharacterCommand = (cmd) => {
    return cmd.length > 0 && ('brody'.startsWith(cmd) || 'quint'.startsWith(cmd) || 'hooper'.startsWith(cmd))
}

banner()
game.initAct1()

do {
    statusBar(game.round(), game.phase())
    entry = readline.question("> ")
    tokens = entry.toLowerCase().split(' ');
    cmd = tokens.shift()

    if (isCharacterCommand(cmd)) {
        game.charCommand(cmd, tokens)
    } else if (cmd.length > 0 && 'event'.startsWith(cmd)) {
        game.amityEvent(tokens[0])
    } else {
        switch (cmd) {
            case 'status':
                game.showStatus()
                break;
            case 'n':
            case 'next':
                game.nextPhase()
                break
            case 'restart':
                game.initAct1();
                break
            case 'quit':
                quit = true;
                break
            case '':
            case 'help':
            case '?':
                help()
                break
            default:
                console.log('Invalid command: ' + chalk.magenta(cmd))
                help()
        }
    }
} while (!quit)
