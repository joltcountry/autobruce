const { foul, bruceSays, log, status } = require('./display')
const { getWaterLocations, amity } = require('./constants');
const chalk = require('chalk');

var bruce
var hooper
var quint
var brody
var map
var round
var phase

exports.round = () => { return round }
exports.phase = () => { return phase }

exports.nextPhase = () => {
    phase = (phase + 1) % 3
    if (phase == 0) {
        round += 1
    }
}
exports.initAct1 = () => {

    log("Initializing Act I...")

    round = 1
    phase = 0

    waters = getWaterLocations()
    randomWater = Math.floor(Math.random() * waters.length)

    bruce = {
        loc: waters[randomWater].tag
    }

    quint = {
        loc: "8",
        barrels: 2
    }

    hooper = {
        loc: "5"
    }

    brody = {
        loc: "7"
    }

    map = {

    }

    log("Bruce is in " + bruce.loc)
    log("Hooper is in " + hooper.loc)
    log("Brody is in " + brody.loc)
    log("Quint is in " + quint.loc)

}

exports.fishFinder = () => {

    if (bruce.loc == hooper.loc) {
        bruceSays("You found me!")
    }
//    else { if nearby, say nearby }
    else {
        bruceSays("I'm not nearby!")
    }
}

exports.moveChar = ( char, loc ) => {
    if (!loc) {
        foul(verb, 'requires the location (e.g., "ff w")')
    } else {
        switch (char.toLowerCase()) {
            case 'q':
                quint.loc = loc.toUpperCase()
                log("Quint is now in " + quint.loc)
                break
            case 'h':
                hooper.loc = loc.toUpperCase()
                log("Hooper is now in " + hooper.loc)
                break
            case 'b':
                brody.loc = loc.toUpperCase()
                log("Brody is now in " + brody.loc)
                break
        }
    }
}
