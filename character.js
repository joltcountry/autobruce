class Character {
    
    constructor(name, loc, barrels, land) {
        this.name = name
        this.loc = loc
        this.barrels = barrels
        this.land = land
    }

    toString() {
        return this.name + " is at location " + this.loc + " with " + this.barrels + " barrels."
    }
}

module.exports = { Character }
