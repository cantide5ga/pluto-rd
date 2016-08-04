import { IBlogStore } from '../BlogStore';
import { Action } from '../../actions/Action';
import { ActionTypes } from '../../actions/ActionTypes';
import { Entry, EntryResult } from 'pluto-rd';
import { rig, Rig } from 'flux-test-rig';

let store: IBlogStore;
let cb: (action: Action) => void;
let rigged: Rig<IBlogStore>;

const 
    date = new Date(),
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

describe('BlogStore', function() {  
    beforeEach(() => {
        rigged = rig<IBlogStore>('../BlogStore.js', 'cb');
              
        store = rigged.getStore('BlogStore');
        cb = rigged.invokeAction
    });
    
    it('sets the entry driver function', () => {
        initEntryDriver();
        
        expect(rigged.get('qryEntries')).not.toBeUndefined();
        expect(rigged.get('qryEntries')).toBe(driver);
        //expect fn signature/params
    });
    
    it('executes the entry driver function', () => {
        initEntryDriver();
        
        let action: Action = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'Tsuga'
        }
        
        cb(action);
        expect(store.getEntries()).toEqual( [entry2] );
        
        action = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'hardwood'
        }
        
        cb(action);
        expect(store.getEntries()).toEqual( [entry1, entry3] );
    });
    
    it('returns an empty array when the driver returns something falsey (e.g. nothing)', () => {
        initEntryDriver();
        
        let action = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'sawblade' 
        }
        
        cb(action);
        expect(Array.isArray(store.getEntries())).toBeTruthy();
    });
    
    it('returns empty array when the driver has not been set', () => {
        let action = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'sawblade' 
        }
        
        cb(action);
        expect(Array.isArray(store.getEntries())).toBeTruthy();
    });
    
    it('returns only 2 entries when maxPerPage set to 2', () => {
        const driverAction: Action = {
            actionType: ActionTypes.ENTRY_DRIVER_CONNECT,
            payload: driver 
        }         
        cb(driverAction);

        const mountAction: Action = {
            actionType: ActionTypes.BLOG_MOUNTED,
            payload: 2 
        }
        cb(mountAction);
        
        let action = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'tree' 
        }
        
        cb(action);
        expect(store.getEntries()).toEqual( [entry1, entry2] );
    });
    
    //TODO paging
    
    function initEntryDriver(): void {
        const driverAction: Action = {
            actionType: ActionTypes.ENTRY_DRIVER_CONNECT,
            payload: driver 
        }         
        cb(driverAction);

        const mountAction: Action = {
            actionType: ActionTypes.BLOG_MOUNTED,
            payload: 3 
        }
        cb(mountAction); 
    }
});

