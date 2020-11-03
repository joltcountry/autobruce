const { foul, bruceSays, log, status } = require('./display')
const { getWaterLocations, initMap} = require('./maputils');
const chalk = require('chalk');
const { Character } = require('./character');

var bruce
var hooper
var quint
var brody
var map
var round
var phase
var gameState

getChar = (char) => {
    if ('quint'.startsWith(char)) return quint;
    if ('hooper'.startsWith(char)) return hooper;
    return brody;
}

exports.round = () => { return round }
exports.phase = () => { return phase }

exports.nextPhase = () => {
    phase = (phase + 1) % 3
    if (phase == 0) {
        round += 1
        gameState.launched = false;
    }
}

exports.initAct1 = () => {

    log("Initializing Act I...")

    map = initMap()
    gameState = {}
    round = 1
    phase = 0

    waters = getWaterLocations(map)
    randomWater = Math.floor(Math.random() * waters.length)

    bruce = {
        loc: waters[randomWater].tag
    }

    quint = new Character("Quint", "8", 2);
    hooper = new Character("Hooper", "5", 0);
    brody = new Character("Brody", "7", 0, true);

    log("Bruce is in location " + bruce.loc)
    log(hooper.toString())
    log(brody.toString())
    log(quint.toString())

}

exports.amityEvent = (event) => {
    if (phase != 0) {
        foul(verb, "can only be played in Event Phase.")
        return
    }
}

exports.charCommand = (char, args) => {

    if (phase != 2) {
        foul('Crew actions can only be used in Crew Phase.')
        return;
    }

    if (args.length == 0) {
        foul(char, "requires an action")
        return;
    }

    const action = args[0]

    if ('binoculars'.startsWith(action)) {
        let c = getChar(char)
        let brodyLoc = map.find(loc => loc.tag === brody.loc)

        if (!(c === brody)) {
            foul('Only Brody may use binoculars')
        } else if (!(brodyLoc.beach)) {
            foul('Brody must be at a beach to use binoculars.')
        } else {
            if (bruce.loc === brody.loc && !gameState.outOfSight) {
                bruceSays("Your binoculars spotted me!")
            } else {
                // TODO - nearby
                bruceSays("I'm not at that beach!");
            }
        }
    } else if ('fishfinder'.startsWith(action)) {
        if (!char.startsWith('h')) {
            foul('Only Hooper may use the Fishfinder')
        } else {
            if (bruce.loc === hooper.loc) {
                bruceSays("You found me!")
            } else {
                // TODO - nearby
                bruceSays("I am not nearby!");
            }
        }

    } else if ('launch'.startsWith(action)) {

        if (!char.startsWith('q')) {
            foul('Only Quint may launch a barrel.')
        } else if (quint.barrels == 0) {
            foul('Quint has no barrels to launch.')
        } else if (gameState.launched) {
            foul('Quint may only launch one barrel per round.')
        } else {
            quint.barrels--
            let target = args[1] ? args[1] : quint.loc
            targetLoc = map.find(loc => loc.tag === target.toUpperCase());
            targetLoc.barrels = targetLoc.barrels ? targetLoc.barrels + 1 : 1
            gameState.launched = true
            console.log("Quint launched a barrel in location " + target)
        }

    } else if ('move'.startsWith(action)) {

        if (args.length == 1) {
            foul("Must specify target location to move.")
            return;
        }

        let targetLoc = map.find(loc => loc.tag === args[1].toUpperCase());

        if (!targetLoc) {
            foul(args[1], 'is not a valid location.')
        } else {
            let mover = getChar(char)
            if (mover.land && !targetLoc.land) {
                foul(mover.name + ' may only move to land locations.')
            } else if (!mover.land && !targetLoc.water) {
                foul(mover.name+ ' may only move to water locations.')
            } else {
                mover.loc = args[1].toUpperCase();
                console.log (mover.name + ' moved to location ' + mover.loc);
            }
        }

    } else if ('drop'.startsWith(action)) {

        let dropper = getChar(char);
        let targetLoc = map.find(loc => loc.tag === dropper.loc)
        let num = args[1] ? args[1] : 1

        if (!dropper.barrels) {
            foul(dropper.name + ' has no barrel[s] to drop.')
            return
        }

        if (dropper.barrels < num) {
            foul(dropper.name + ' only has ' + dropper.barrels + ' barrel[s] to drop.')
            return
        }

        if (!targetLoc.dock) {
            foul('Location ' + targetLoc.tag + ' has no dock.')
            return
        }

        if (dropper === brody && num > 1) {
            foul(brody.name + ' may only drop one barrel per action')
            return
        }

        targetLoc.dockBarrels = targetLoc.dockBarrels ? targetLoc.dockBarrels + num : num
        dropper.barrels -= num

        console.log(dropper.name + ' dropped ' + num + ' barrel[s] at the dock in location ' + targetLoc.tag)

    } else if ('pickup'.startsWith(action)) {

        // TODO fix rules about how much and from where
        let picker = getChar(char);
        let targetLoc = map.find(loc => loc.tag === picker.loc )
        let num = args[1] ? args[1] : 1

        if (picker === brody && !targetLoc.dock) {
            foul('Location ' + targetLoc.tag + ' has no dock.')
            return
        }

        if (picker === brody && num > 1) {
            foul(brody.name + ' may only pick up one barrel per action')
            return
        }

        if (!targetLoc.dockBarrels) {
            foul('There are no barrels to pick up at the dock in location ' + targetLoc.tag)
            return
        }

        if (num > targetLoc.dockBarrels) {
            foul('The dock at location ' + targetLoc.tag + ' only has ' + targetLoc.dockBarrels + ' available')
            return
        }

        targetLoc.dockBarrels -= num
        picker.barrels = picker.barrels ? picker.barrels + num : num

        console.log(picker.name + ' picked up ' + num + ' barrel[s] from the dock in location ' + targetLoc.tag)

    } else if ('rescue'.startsWith(action)) {

        // TODO michael
        let rescuer = getChar(char);
        let targetLoc = map.find(loc => loc.tag === rescuer.loc )

        if (!targetLoc.beach) {
            foul('Location ' + targetLoc.tag + ' is not a beach.')
            return
        }
        if (!targetLoc.swimmers) {
            foul('There are no swimmers to rescue in location ' + targetLoc.tag)
            return
        }

        targetLoc.swimmers -= 1
        console.log(rescuer.name + ' rescued 1 swimmer from location ' + targetLoc.tag)


    } else if ('close'.startsWith(action)) {

        if (args.length == 1) {
            foul("Must specify which beach to close.")
            return;
        }

        let closer = getChar(char)
        let targetLoc = map.find(loc => loc.tag === args[1].toUpperCase())
        let brodyLoc = map.find(loc => loc.tag === brody.loc);

        if (!targetLoc) {
            foul(args[1], 'is not a valid location.')
            return
        }

        if (!(targetLoc.beach)) {
            foul(args[1], 'is not a beach.')
            return
        }

        if (!(closer === brody)) {
            foul('Only Brody can close a beach.')
            return
        }

        if (!brodyLoc.admin) {
            foul('Brody must be at the PD or Mayor\'s office to close a beach.')
            return
        }

        if (targetLoc.closed) {
            foul('The ' + targetLoc.tag + ' beach is already closed.')
            return
        }

        map.forEach(loc => {
            loc.closed = 0;
        })

        targetLoc.closed = 2;
        console.log('Brody has closed the ' + targetLoc.tag + ' beach.')

    } else {
        foul(action, 'is not a valid action.')
    }

}

exports.showStatus = () => {
    [brody, hooper, quint].forEach(char => {
        console.log(chalk.yellow(char.toString()));
    })
    map.forEach(loc => {
        if (loc.barrels > 0) {
            console.log(chalk.yellow('Location ' + loc.tag + ' has ' + loc.barrels + ' barrel[s] in the water.'))
        }
    })
    map.forEach(loc => {
        if (loc.dockBarrels > 0) {
            console.log(chalk.yellow('Location ' + loc.tag + ' has ' + loc.dockBarrels + ' barrel[s] on the dock.'))
        }
    })
    map.filter(loc => loc.swimmers).forEach(loc => {
        console.log(chalk.yellow('There are ' + loc.swimmers + ' swimmers at the ' + loc.tag + ' beach.'))
    });
    map.filter(loc => loc.closed).forEach(loc => {
        console.log(chalk.yellow('The ' + loc.tag + ' beach is closed.'))
    });
}
