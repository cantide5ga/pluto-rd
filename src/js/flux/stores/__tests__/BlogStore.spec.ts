// import rewire = require('rewire');
// import { Rewire } from 'rewire';
// import { BlogStoreStatic } from '../BlogStore';
// import { Action } from '../../actions/Action';
// import { ActionTypes } from '../../actions/ActionTypes';
// import { Entry } from 'pluto-rd';

// type Intersect<T> = { BlogStore: T } & Rewire;

// let rewired: Intersect<BlogStoreStatic>;
// let cb: (action: Action) => void;

// const 
//     date = new Date(),
//     title1 = 'Trixie!',
//     content1 = 'Trixie is my dog',
//     keywords1 = ['dog'],
//     title2 = 'Tango!',
//     content2 = 'Tango is my cat',
//     keywords2 = ['cat'],
//     entry1: Entry = {
//         title: title1,
//         date: new Date(),
//         content: content1,
//         keywords: keywords1                            
//     },    
//     entry2: Entry = {
//         title: title2,
//         date: new Date(),
//         content: content2,
//         keywords: keywords2                            
//     },
//     driver = (keyword: string) => {
//         if(keyword == 'dog') return entry1;
//         if(keyword == 'cat') return entry2;
//     }

// describe('BlogStore', function() {  
//     beforeEach(() => {
//         rewired = rewire<Intersect<BlogStoreStatic>>('../BlogStore');
//         cb = rewired.__get__('cb'); 
//     });
    
//     it('sets the entry driver function', () => {
//         initEntryDriver();
        
//         expect(rewired.__get__('qryEntries')).not.toBeUndefined();
//         expect(rewired.__get__('qryEntries')).toBe(driver);
//     });
    
//     it('executes the entry driver function', () => {
//         initEntryDriver();
        
//         let action: Action = {
//             actionType: ActionTypes.KEYWORD_CLICK,
//             payload: 'dog' 
//         }
        
//         cb(action);
//         expect(rewired.BlogStore.getEntries()).toBe(entry1);
        
//         action = {
//             actionType: ActionTypes.KEYWORD_CLICK,
//             payload: 'cat' 
//         }
        
//         cb(action);
//         expect(rewired.BlogStore.getEntries()).toBe(entry2);
//     });
    
//     it('returns an empty array when the driver returns something falsey (e.g. nothing)', () => {
//         initEntryDriver();
        
//         let action = {
//             actionType: ActionTypes.KEYWORD_CLICK,
//             payload: 'robot' 
//         }
        
//         cb(action);
//         expect(Array.isArray(rewired.BlogStore.getEntries())).toBeTruthy();
//     });
    
//     it('returns empty array when the driver has not been set', () => {
//         let action = {
//             actionType: ActionTypes.KEYWORD_CLICK,
//             payload: 'robot' 
//         }
        
//         cb(action);
//         expect(Array.isArray(rewired.BlogStore.getEntries())).toBeTruthy();
//     });
    
//     function initEntryDriver(): void {
//         const action: Action = {
//             actionType: ActionTypes.ENTRY_DRIVER_CONNECT,
//             payload: driver 
//         }         
//         cb(action); 
//     }
// });

