const readline = require('readline-sync')
const chalk = require('chalk')
const { foul, status, log, banner, help } = require('./display')
const game = require('./game')

let quit = false

validateVerb = (verb) => {
    if (verb === 'e' && game.phase() != 0) {
        foul(verb, "can only be played in Event Phase.")
        return false;
    }
    if (['h', 'b', 'q', 'ff'].includes(verb) && game.phase() != 2) {
        foul(verb, "can only be played in Crew Phase");
        return false
    }
    return true;
}

banner()
game.initAct1()

do {
    status(game.round(), game.phase())
    cmd = readline.question("> ")
    tokens = cmd.toLowerCase().split(' ');
    [ verb, noun ] = tokens

    if (validateVerb(verb.toLowerCase())) {
        switch (verb.toLowerCase()) {
            case 'e':
                // game.amityEvent(noun)
                break;
            case 'ff':
                game.fishFinder()
                break;
            case 'h':
            case 'b':
            case 'q':
                game.moveChar(verb, noun)
                break
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
