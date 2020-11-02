const amity = [
    {
        "tag": "1",
        "water": true,
        "adj": []
    },
    {
        "tag": "2",
        "water": true,
        "adj": []
    },
    {
        "tag": "3",
        "water": true,
        "adj": []
    },
    {
        "tag": "4",
        "water": true,
        "adj": []
    },
    {
        "tag": "5",
        "dock": true,
        "barrels": 0,
        "water": true,
        "adj": []
    },
    {
        "tag": "6",
        "water": true,
        "adj": []
    },
    {
        "tag": "7",
        "water": true,
        "adj": []
    },
    {
        "tag": "8",
        "water": true,
        "adj": []
    },
    {
        "tag": "N",
        "beach": true,
        "water": true,
        "adj": ["1", "5", "6", "STORE"],
    },
    {
        "tag": "E",
        "beach": true,
        "water": true,
        "adj": []
    },
    {
        "tag": "S",
        "beach": true,
        "water": true,
        "adj": []
    },
    {
        "tag": "W",
        "beach": true,
        "water": true,
        "adj": []
    },
    {
        "tag": "STORE",
        "water": false,
        "adj": []
    },
]

getWaterLocations = () => {
    return amity.filter(loc => loc.water);
}

module.exports = {
    amity: amity,
    getWaterLocations: getWaterLocations
}
