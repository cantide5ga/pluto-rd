import { IWordCloudStore } from '../WordCloudStore';
import { Action } from '../../actions/Action';
import { ActionTypes } from '../../actions/ActionTypes';
import { Keyword } from 'pluto-rd';
import { rig, Rig } from 'flux-test-rig';

let store: IWordCloudStore;
let cb: (action: Action) => void;
let rigged: Rig<IWordCloudStore>;

const
    keyword1: Keyword = {
            handle: 'dog',
            count: 10,
            lastTagged: new Date(),
            hits: 10
        },
    keyword2: Keyword = {
            handle: 'cat',
            count: 5,
            lastTagged: new Date(),
            hits: 5
        },
    totalEntries = 100,
    keywords: Keyword[] = [
        keyword1,
        keyword2
    ];

describe('WordCloudStore', () => {  
    beforeEach(() => {
        rigged = rig<IWordCloudStore>('../WordCloudStore.js', 'cb');
              
        store = rigged.getStore('WordCloudStore');
        cb = rigged.invokeAction
    });
    
    it('returns defined values for uninitialized data', () => {
        const spy = rigged.getSpy('initKeywords');
                      
        expect(spy).not.toHaveBeenCalled();
        expect(rigged.get('fWords')).toBeDefined();
    });
    
    it('sets the keywords and total entry count on data source initialization', () => {
        // const payload = {
        //     keywords: keywords,
        //     entryCount: totalEntries
        // }
        
        // const action: Action = {
        //     actionType: ActionTypes.KEYWORD_DRIVER_CONNECT,
        //     payload: payload 
        // }         
        
        // const initKeywords = rewired.__get__('initKeywords');
        // rewired.__set__('initKeywords', jasmine.createSpy('initKeywords', initKeywords).and.callThrough());
        // const spy = rewired.__get__('initKeywords');
              
        // cb(action);           
                
        // expect(spy).toHaveBeenCalled();
        // expect(rewired.__get__('keywords')).toBeDefined();
        // expect(rewired.__get__('totalEntries')).toBeDefined();
        // //expect(rewired.WordCloudStore.getKeywords()).toBe(keywords);
        // //expect(rewired.WordCloudStore.getTotalEntries()).toBe(totalEntries);
    });
});

