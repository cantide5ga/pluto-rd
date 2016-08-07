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
        
        const fWords = rigged.get('fWords');
        expect(fWords).toBeDefined();
        expect(Array.isArray(fWords)).toBeTruthy();
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
        
        const spy = rigged.getSpy('initKeywords').and.callThrough();
              
        cb(action);           
                
        expect(spy).toHaveBeenCalledWith(payload);
        expect(store.getStore().length).toEqual(2);
    });
    
    it('sets the keyword as selected on KEYWORD_CLICK', () => {
        //setup
        const payload = {
            keywords: keywords,
            entryCount: totalEntries
        }
        const action: Action = {
            actionType: ActionTypes.KEYWORD_DRIVER_CONNECT,
            payload: payload 
        }
        cb(action);      
        
        const dogKeywordClickAction = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'dog'
        }
        
        const catKeywordClickAction = {
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: 'cat'
        }         
        
        //helper to decrease test fragility
        const fWords = store.getStore();
        const getFWordWithHandle = (handle: string) => {
            return fWords.filter(fWord => {
                return fWord.handle == handle;    
            })[0];
        } 
        
        const spy = rigged.getSpy('highlight').and.callThrough();
        cb(dogKeywordClickAction);
        expect(spy).toHaveBeenCalledWith('dog');
        expect(getFWordWithHandle('dog').selected).toBeTruthy();
        expect(getFWordWithHandle('cat').selected).toBeFalsy();      
        
        cb(catKeywordClickAction);
        expect(spy).toHaveBeenCalledWith('cat');
        expect(getFWordWithHandle('dog').selected).toBeFalsy();
        expect(getFWordWithHandle('cat').selected).toBeTruthy();
    });
});

