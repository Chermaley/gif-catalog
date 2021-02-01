export const getRandomTag = () => {

    let wordList = [
        'canal', 'heartless', 'demonic', 'hone', 'lovingly', 'bearer', 'asthma', 'guise', 'jasmine', 'veronica', 'regent',
        'decorator', 'loaf', 'talented', 'burned', 'sax', 'modernist', 'dark', 'remain', 'may', 'ore', 'sniff', 'strainer',
        'womanhood', 'feared', 'shop', 'opaque', 'wobbly', 'turquoise', 'ravine', 'plumb', 'subsidize', 'facade', 'tantalize',
        'sensory', 'threat', 'theme', 'infected', 'craving', 'final', 'i', 'buzz', 'discover', 'quarter', 'air', 'karaoke', 'rigor',
        'alexis', 'wand', 'editing', 'lowland', 'seed', 'brazilian', 'rifle', 'historian', 'prescient', 'edith', 'immunize', 'thrift',
        'secretive', 'inert', 'edge', 'breezy', 'tall', 'aphid', 'corner', 'nylon', 'wake', 'up', 'badge', 'lore', 'hack', 'tiger',
        'cohort', 'elsewhere', 'retention', 'condo', 'terminal', 'plenty', 'dusty', 'detour', 'loin', 'opposite', 'abroad', 'castle',
        'seclusion', 'overlook', 'benign', 'clinic', 'flashing', 'perk', 'cuisine', 'shelter', 'grit', 'haven', 'grope', 'turret',
        'man', 'graphite', 'elephant'
    ];
    let rand = Math.floor(Math.random() * wordList.length);
    let tag = wordList[rand];
    return tag;
}