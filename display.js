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
    console.log(chalk.magenta(verb) + (desc ? ' ' + desc : ''))
}

exports.bruceSays = (a) => {
    console.log(chalk.cyan(a));
}

exports.statusBar = (a, b) => {
    console.log("\n" + chalk.bgBlue("Round " + a + ", " + phases[b]));
}

exports.help = () => {
    console.log("Available commands:")
    console.log(chalk.green("    s[tatus]") + ": Show game status");
    console.log(chalk.green("    e[vent] <event>") + ": Specified event card is played (Event Phase only)");
    console.log(chalk.green("    b[rody] <action> [argument]") + ": Perform action with Brody");
    console.log(chalk.green("    h[ooper] <action> [argument]") + ": Perform action with Hooper");
    console.log(chalk.green("    q[uint] <action> [argument]") + ": Perform action with Quint");
    console.log("        " + chalk.green.underline("Possible actions:"))
    console.log(chalk.yellow("         m[ove] <loc>"))
    console.log(chalk.yellow("         d[rop] <number of barrels>"))
    console.log(chalk.yellow("         p[ickup] <number of barrels>"))
    console.log(chalk.yellow("         g[ive] <crewmember> <number of barrels>"))
    console.log(chalk.yellow("         l[aunch] <loc>"))
    console.log(chalk.yellow("         f[ishfinder]"))
    console.log(chalk.yellow("         r[escue]"))
    console.log(chalk.yellow("         c[lose] <beach loc>"))
    console.log(chalk.yellow("         b[inoculars]"))
    console.log(chalk.green("    next") + ": Proceed to next game phase");
    console.log(chalk.green("    restart") + ": Restart game from Act I");
    console.log(chalk.green("    quit") + ": Leave the game");
}
