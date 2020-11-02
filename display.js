const chalk = require('chalk');

const phases = [
    "Event Phase",
    "Shark Phase",
    "Crew Phase"
]

exports.banner = () => {
    console.log(chalk.cyan('AUTOBRUCE (v0.01)'))
    console.log(chalk.cyan('Copyright 2020, Jolt Country Games'))
}

exports.log = (a) => {
    if (process.env.DEBUG === 'true') {
        console.log(chalk.yellow(a));
    }
}

exports.foul = (verb, desc) => {
    console.log(chalk.magenta(verb) + ' ' + desc)
}

exports.bruceSays = (a) => {
    console.log(chalk.cyan(a));
}

exports.status = (a, b) => {
    console.log("\n" + chalk.bgBlue("Round " + a + ", " + phases[b]));
}

exports.help = () => {
    console.log("Available commands:")
    console.log(chalk.green("    e <event>") + ": Specified event card is played (Event Phase only)");
    console.log(chalk.green("    b <loc>") + ": Brody moves to specified location");
    console.log(chalk.green("    h <loc>") + ": Hooper moves to specified location");
    console.log(chalk.green("    q <loc>") + ": Quint moves to specified location");
    console.log(chalk.green("    ff") + ": Hooper plays the Fish Finder");
    console.log(chalk.green("    restart") + ": Restart game from Act I");
    console.log(chalk.green("    quit") + ": Leave the game");
}
