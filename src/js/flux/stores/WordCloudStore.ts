import { Dispatcher } from '../dispatcher/Dispatcher';
import { AbstractStore } from './AbstractStore';
import { Ds } from '../../connector/DataSourceConnector'
import { Listener } from '../../config/Listener';
import { Keyword } from 'pluto-rd';
import { ActionTypes } from '../actions/ActionTypes';
import { Action } from '../actions/Action';

let keywords = new Array<Keyword>();
let totalEntries = 0;

const initKeywords = (payload: { keywords: Keyword[], entryCount: number }) => {
    keywords = payload.keywords;
    totalEntries = payload.entryCount;
}

const highlight = (handle: string) => {
    keywords.forEach((keyword) => {  
        keyword.selected = false;
        if(keyword.handle == handle)
            keyword.selected = true; 
    });
}

const notifyListener = (handle: string) => {
    Listener.keywordOn(handle);
}

export class WordCloudStoreStatic extends AbstractStore {
    public getStore(): { keywords: Keyword[], totalEntries: number } {
        return {
            keywords: keywords,
            totalEntries: totalEntries
        }
    }
}

//singleton
export const WordCloudStore = new WordCloudStoreStatic();

const cb = (action: Action): void => {
    switch(action.actionType) {
        case ActionTypes.KEYWORD_DRIVER_CONNECT:
        initKeywords(action.payload);
        WordCloudStore.emitChange();
        break;
        
        case ActionTypes.KEYWORD_CLICK:
        highlight(action.payload);
        notifyListener(action.payload);
        WordCloudStore.emitChange();
        break;
    }
}

Dispatcher.register(cb);