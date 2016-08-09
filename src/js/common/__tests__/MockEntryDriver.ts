import { Entry, EntryResult } from 'pluto-rd';

export const 
    tree = {
        SYCAMORE: 'Sycamore',
        EASTERN_HEMLOCK: 'Eastern Hemlock',
        BIRCH: 'Birch'    
    },
    title1 = tree.SYCAMORE,
    content1 = 'Has exfoliating bark.',
    keywords1 = ['tree', 'Platanus', 'hardwood'],
    title2 = tree.EASTERN_HEMLOCK,
    content2 = 'Is very long lived.',
    keywords2 = ['tree', 'Tsuga', 'softwood'],
    title3 = tree.BIRCH,
    content3 = 'Bark has horizontal lenticels.',
    keywords3 = ['tree', 'Betula', 'hardwood'],
    entry1: Entry = {
        title: title1,
        date: new Date(),
        content: content1,
        keywords: keywords1                            
    },    
    entry2: Entry = {
        title: title2,
        date: new Date(),
        content: content2,
        keywords: keywords2                            
    },
    entry3: Entry = {
        title: title3,
        date: new Date(),
        content: content3,
        keywords: keywords3                            
    },
    result1: EntryResult = {
        pagedEntries: [ entry1 ],
        totalCount: 1
    },
    result2: EntryResult = {
        pagedEntries: [ entry2 ],
        totalCount: 1
    }, 
    driver = (keyword: string, offset: number, count: number) => {
        let entries = new Array<Entry>();
        
        switch(keyword) {
            case 'tree': entries.push(entry1, entry2, entry3); break;
            case 'hardwood': entries.push(entry1, entry3); break;
            case 'Platanus': entries.push(entry1); break;
            case 'Tsuga': entries.push(entry2); break;
            case 'Betula': entries.push(entry3); break;
            //default: entries.push(entry1, entry2, entry3);
        }

        return { 
            pagedEntries: entries.slice(offset, offset + count), 
            totalCount: entries.length 
        };
    }