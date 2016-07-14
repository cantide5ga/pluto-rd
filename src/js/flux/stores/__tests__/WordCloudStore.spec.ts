import rewire = require('rewire');
import { Rewire } from 'rewire';
import { WordCloudStoreStatic } from '../WordCloudStore';
import { Action } from '../../actions/Action';
import { ActionTypes } from '../../actions/ActionTypes';
import { Keyword } from 'pluto-rd';

type Intersect<T> = { WordCloudStore: T } & Rewire;

let rewired: Intersect<WordCloudStoreStatic>;
let cb: (action: Action) => void;

const
    keyword1: Keyword = {
            handle: 'dog',
            count: 10,
            recent: false
        },
    keyword2: Keyword = {
            handle: 'cat',
            count: 5,
            recent: true
        },
    totalEntries = 100,
    keywords: Keyword[] = [
        keyword1,
        keyword2
    ];

describe('WordCloudStore', function() {  
    beforeEach(() => {
        rewired = rewire<Intersect<WordCloudStoreStatic>>('../WordCloudStore');
        cb = rewired.__get__('cb'); 
    });
    
    it('returns defined values for uninitialized data', () => {
        const initKeywords = rewired.__get__('initKeywords');
        rewired.__set__('initKeywords', jasmine.createSpy('initKeywords', initKeywords));
        const spy = rewired.__get__('initKeywords');
                      
        expect(spy).not.toHaveBeenCalled();
        expect(rewired.__get__('keywords')).toBeDefined();
        expect(rewired.__get__('totalEntries')).toBeDefined();
        //expect(Array.isArray(rewired.WordCloudStore.getKeywords())).toBeTruthy();
        //expect(typeof rewired.WordCloudStore.getTotalEntries()).toBe('number');
    });
    
    it('sets the keywords and total entry count on data source initialization', () => {
        const payload = {
            keywords: keywords,
            entryCount: totalEntries
        }
        
        const action: Action = {
            actionType: ActionTypes.KEYWORD_DRIVER_CONNECT,
            payload: payload 
        }         
        
        const initKeywords = rewired.__get__('initKeywords');
        rewired.__set__('initKeywords', jasmine.createSpy('initKeywords', initKeywords).and.callThrough());
        const spy = rewired.__get__('initKeywords');
              
        cb(action);           
                
        expect(spy).toHaveBeenCalled();
        expect(rewired.__get__('keywords')).toBeDefined();
        expect(rewired.__get__('totalEntries')).toBeDefined();
        //expect(rewired.WordCloudStore.getKeywords()).toBe(keywords);
        //expect(rewired.WordCloudStore.getTotalEntries()).toBe(totalEntries);
    });
});

