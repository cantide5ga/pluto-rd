import { IBlogStore } from '../BlogStore';
import { Action } from '../../actions/Action';
import { ActionTypes } from '../../actions/ActionTypes';
import { Entry, EntryResult } from 'pluto-rd';
import { rig, Rig } from 'flux-test-rig';
import { Dispatcher } from '../../dispatcher/Dispatcher';

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
        initEntryDriver(3);
        
        expect(rigged.get('qryEntries')).not.toBeUndefined();
        expect(rigged.get('qryEntries')).toBe(driver);
    });
    
    it('executes the entry driver function', () => {
        initEntryDriver(3);
        
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
        initEntryDriver(3);
        
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
    
    it('fetches only 2 entries in a result of 3 when maxPerPage set to 2', () => {
        initEntryDriver(2);
        
        let action = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'tree' 
        }
        
        cb(action);
        expect(store.getPageCount()).toEqual(2);
        expect(store.getEntries().length).toEqual(2);
        expect(store.getEntries()).toEqual( [entry1, entry2] );
    });
    
    it('fetches the last entry in a result of 3 when maxPerPage set to 2 on PAGE_CLICK of 2', () => {
        initEntryDriver(2);
        
        let clickAction = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'tree' 
        }
        
        let pageClickAction = {
            actionType: ActionTypes.PAGE_CLICK,
            payload: 2                       
        }

        cb(clickAction);
        cb(pageClickAction);
        expect(store.getCurrentPage()).toEqual(2);
        expect(store.getEntries().length).toEqual(1);
        expect(store.getEntries()).toEqual( [entry3] );
    });
    
    it('fetches the last entry in a result of 3 when maxPerPage set to 2 on NEXT_PAGE ', () => {
        initEntryDriver(2);
        
        let clickAction = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'tree' 
        }
        
        let pageNextAction = {
            actionType: ActionTypes.NEXT_PAGE            
        }
        
        cb(clickAction);
        cb(pageNextAction);
        expect(store.getCurrentPage()).toEqual(2);
        expect(store.getEntries().length).toEqual(1);
        expect(store.getEntries()).toEqual( [entry3] );
    });

    it('fetches the first entries in a result of 3 when maxPerPage set to 2 on PREV_PAGE', () => {
        initEntryDriver(2);
        
        let clickAction = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'tree' 
        }
        
        let pageNextAction = {
            actionType: ActionTypes.NEXT_PAGE            
        }
        
        let pagePrevAction = {
            actionType: ActionTypes.PREV_PAGE            
        }

        cb(clickAction);
        expect(store.getPageCount()).toEqual(2);
        cb(pageNextAction);
        expect(store.getCurrentPage()).toEqual(2);
        cb(pagePrevAction);
        expect(store.getCurrentPage()).toEqual(1);
        expect(store.getEntries().length).toEqual(2);
        expect(store.getEntries()).toEqual( [entry1, entry2] );
    });
    
    it('nullifies the current active keyword', () => {
        initEntryDriver(3);
        
        let clickAction = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'tree' 
        }
        
        cb(clickAction);
        expect(store.getEntries().length).toEqual(3);
        expect(rigged.get('currHandle')).toEqual('tree');
        
                
        let resetAction = {
            actionType: ActionTypes.ENTRIES_RESET 
        }
        
        cb(resetAction);
        expect(store.getEntries().length).toEqual(0);
        expect(rigged.get('currHandle')).toBeNull();
    });
    
    function initEntryDriver(maxPerPage: number): void {
        const driverAction: Action = {
            actionType: ActionTypes.ENTRY_DRIVER_CONNECT,
            payload: driver 
        }         
        cb(driverAction);

        const mountAction: Action = {
            actionType: ActionTypes.BLOG_MOUNTED,
            payload: maxPerPage 
        }
        cb(mountAction); 
    }
});

