var element = {
    CALCIUM: "calcium",
    VANADIUM: "vanadium",
    SILICON: "silicon",
    OXYGEN: "oxygen",
    FLUORINE: "fluorine",
    SODIUM: "sodium",
    MAGNESIUM: "magnesium",
    CHROMIUM: "chromium",
    IRON: "iron",
    HYDROGEN: "hydrogen",
    BORON: "boron",
    ALUMINUM: "aluminum",
    COPPER: "copper"   
}

var keywords = [
    {
        handle: element.CALCIUM,
        count: 3,
        recent: false
    },
    {
        handle: element.VANADIUM,
        count: 1,
        recent: false
    },
    {
        handle: element.SILICON,
        count: 5,
        recent: false
    },
    {
        handle: element.OXYGEN,
        count: 5,
        recent: false
    },
    {
        handle: element.FLUORINE,
        count: 1,
        recent: false
    },
    {
        handle: element.SODIUM,
        count: 1,
        recent: true
    },
    {
        handle: element.MAGNESIUM,
        count: 1,
        recent: false
    },
    {
        handle: element.CHROMIUM,
        count: 1,
        recent: false
    },
    {
        handle: element.IRON,
        count: 2,
        recent: false
    },
    {
        handle: element.HYDROGEN,
        count: 4,
        recent: true
    },
    {
        handle: element.BORON,
        count: 1,
        recent: false
    },
    {
        handle: element.ALUMINUM,
        count: 2,
        recent: false
    },
    {
        handle: element.COPPER,
        count: 1,
        recent: true
    }    
]

var entryCount = 6;

var fluorite = {
    title: "Fluorite",
    date: new Date(),
    content: 
        "Fluorite (also called fluorspar) is the mineral form of calcium fluoride, CaF2. It belongs to the halide minerals. It crystallizes in isometric cubic habit, although octahedral and more complex isometric forms are not uncommon. (https://en.wikipedia.org/wiki/Fluorite; http://www.webmineral.com/data/Fluorite.shtml)",
    keywords: [
        element.CALCIUM,
        element.FLUORINE
    ]
}

var pentagonite = {
    title: "Pentagonite",
    date: new Date(),
    content: 
        "Pentagonite is a rare silicate mineral with formula Ca(VO)Si4O10·4(H2O). It was named for the unusual twinning which produces an apparent five-fold symmetry. (https://en.wikipedia.org/wiki/Pentagonite; http://www.webmineral.com/data/Pentagonite.shtml)",
    keywords: [
        element.CALCIUM,
        element.VANADIUM,
        element.SILICON,
        element.HYDROGEN,
        element.OXYGEN
    ]
}

var chromdravite = {
    title: "Chromdravite",
    date: new Date(),
    content: 
        "Tourmaline is a crystalline boron silicate mineral. A highly valuable variety is chrome tourmaline, a rare type of dravite tourmaline from Tanzania. (https://en.wikipedia.org/wiki/Tourmaline; http://www.webmineral.com/data/Chromdravite.shtml)",
    keywords: [
        element.SODIUM,
        element.MAGNESIUM,
        element.CHROMIUM,
        element.IRON,
        element.SILICON,
        element.HYDROGEN,
        element.OXYGEN,
        element.BORON
    ]
}

var chrysocolla = {
    title: "Chrysocolla",
    date: new Date(),
    content: 
        "Chrysocolla is a hydrated copper phyllosilicate mineral with formula: Cu2-xAlx (OH)4·nH2O (x<1) or (Cu,Al)2H2Si2O5(OH)4·nH2O. (https://en.wikipedia.org/wiki/Chrysocolla; http://www.webmineral.com/data/Chrysocolla.shtml)",
    keywords: [
        element.SILICON,
        element.HYDROGEN,
        element.OXYGEN,
        element.ALUMINUM,
        element.COPPER
    ]
}  

var agate = {
    title: "Agate",
    date: new Date(),
    content: 
        "Agates may be found in various kinds of rock, they are classically associated with volcanic rocks and can be common in certain metamorphic rocks. (https://en.wikipedia.org/wiki/Agate; http://webmineral.com/data/Quartz.shtml)",
    keywords: [
        element.SILICON,
        element.OXYGEN,
    ]
}  

var epidote = {
    title: "Epidote",
    date: new Date(),
    content: 
        "Epidote is commonly prismatic in habit, the direction of elongation being perpendicular to the single plane of symmetry. The faces are often deeply striated and crystals are often twinned. (https://en.wikipedia.org/wiki/Epidote; http://www.webmineral.com/data/Epidote.shtml)",
    keywords: [
        element.CALCIUM,
        element.IRON,
        element.SILICON,
        element.HYDROGEN,
        element.OXYGEN,
        element.ALUMINUM
    ]
}  