exports.initMap = () => {
    let newMap = [
        {
            tag: "1",
            water: true,
            adj: []
        },
        {
            tag: "2",
            water: true,
            barrels: 2,
            adj: []
        },
        {
            tag: "3",
            water: true,
            adj: []
        },
        {
            tag: "4",
            water: true,
            adj: []
        },
        {
            tag: "5",
            dock: true,
            water: true,
            land: true,
            adj: []
        },
        {
            tag: "6",
            water: true,
            land: true,
            admin: true,
            adj: []
        },
        {
            tag: "7",
            water: true,
            land: true,
            admin: true,
            adj: []
        },
        {
            tag: "8",
            dock: true,
            water: true,
            land: true,
            adj: []
        },
        {
            tag: "N",
            beach: true,
            water: true,
            swimmers: 3,
            land: true,
            adj: ["1", "5", "6", "STORE"]
        },
        {
            tag: "E",
            beach: true,
            water: true,
            land: true,
            adj: []
        },
        {
            tag: "S",
            beach: true,
            water: true,
            land: true,
            adj: []
        },
        {
            tag: "W",
            beach: true,
            water: true,
            land: true,
            adj: []
        },
        {
            tag: "STORE",
            land: true,
            adj: []
        },
    ]
    return newMap
}

exports.getWaterLocations = (map) => {
    return map.filter(loc => loc.water);
}
