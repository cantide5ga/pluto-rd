var element = {
    CALCIUM: "calcium",
    VANADIUM: "vanadium",
    SILICON: "silicon",
    HYDROGEN: "hydrogen",
    OXYGEN: "oxygen",
    FLUORINE: "fluorine",
    SODIUM: "sodium",
    MAGNESIUM: "magnesium",
    CHROMIUM: "chromium",
    IRON: "iron",
    BORON: "boron",
    ALUMINUM: "aluminum",
    COPPER: "copper"   
}

var keywords = [
    {
        handle: element.CALCIUM,
        count: 5,
        recent: false
    },
    {
        handle: element.VANADIUM,
        count: 5,
        recent: false
    },
    {
        handle: element.SILICON,
        count: 5,
        recent: false
    },
    {
        handle: element.HYDROGEN,
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
        count: 5,
        recent: false
    },
    {
        handle: element.SODIUM,
        count: 5,
        recent: false
    },
    {
        handle: element.MAGNESIUM,
        count: 5,
        recent: false
    },
    {
        handle: element.CHROMIUM,
        count: 5,
        recent: false
    },
    {
        handle: element.IRON,
        count: 5,
        recent: false
    },
    {
        handle: element.BORON,
        count: 5,
        recent: false
    },
    {
        handle: element.ALUMINUM,
        count: 5,
        recent: false
    },
    {
        handle: element.COPPER,
        count: 5,
        recent: false
    }    
]

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

function entryDriver(keyword) {
    var entries = [];   
    var lCased = keyword.toLowerCase();
        
    switch(lCased) {
        case element.CALCIUM: entries.push(pentagonite, fluorite); break;
        case element.VANADIUM: entries.push(pentagonite); break;
        case element.SILICON: entries.push(pentagonite, chromdravite, chrysocolla); break;
        case element.HYDROGEN: entries.push(pentagonite, chromdravite, chrysocolla); break;
        case element.OXYGEN: entries.push(pentagonite, chromdravite, chrysocolla); break;
        case element.FLUORINE: entries.push(fluorite); break;
        case element.SODIUM: entries.push(chromdravite); break;
        case element.MAGNESIUM: entries.push(chromdravite); break;
        case element.IRON: entries.push(chromdravite); break;
        case element.BORON: entries.push(chromdravite); break;
        case element.ALUMINUM: entries.push(chrysocolla); break;
        case element.COPPER: entries.push(chrysocolla); break;
    }
    
    return entries;
}
		
plutoRd.Ds.registerEntryDriver(entryDriver);
plutoRd.Ds.registerKeywordDriver(keywords);

var wordCloud = React.createElement(plutoRd.WordCloud);
ReactDOM.render(wordCloud, document.getElementById('word-cloud-mount'));

var blog = React.createElement(plutoRd.Blog);
ReactDOM.render(blog, document.getElementById('blog-mount'));
    // if(
    //     keyword === element.CALCIUM
    //     || keyword === element.VANADIUM
    //     || keyword === element.SILICON
    //     || keyword === element.HYDROGEN
    //     || keyword === element.OXYGEN
    // )
    //     {
    //         return {
    //             title: "Pentagonite",
    //             date: new Date(),
    //             content: 
    //                 "Pentagonite is a rare silicate mineral with formula Ca(VO)Si4O10·4(H2O). It was named for the unusual twinning which produces an apparent five-fold symmetry. (https://en.wikipedia.org/wiki/Pentagonite; http://www.webmineral.com/data/Pentagonite.shtml)",
    //             keywords: [
    //                 element.CALCIUM,
    //                 element.VANADIUM,
    //                 element.SILICON,
    //                 element.HYDROGEN,
    //                 element.OXYGEN
    //             ]
    //         }
    //     }