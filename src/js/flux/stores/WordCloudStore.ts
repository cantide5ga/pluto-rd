import { Dispatcher } from '../dispatcher/Dispatcher';
import { AbstractStore } from './AbstractStore';
import { Ds } from '../../connector/DataSourceConnector'
import { Listener } from '../../config/Listener';
import { Keyword } from 'pluto-rd';
import { ActionTypes } from '../actions/ActionTypes';
import { Action } from '../actions/Action';
import { IFancyWord } from '../../common/IFancyWord';
import * as moment from 'moment';

const tilOld = 5; // days until no longer recent

const maxFontSize = 32;
const minFontSize = 8;
const multiplier = maxFontSize - minFontSize;

let fWords = new Array<IFancyWord>();

const initKeywords = (payload: { keywords: Keyword[], entryCount: number }) => { 
    const now = moment(new Date()).unix();
    
    let i = 0;
    
    fWords = payload.keywords
    //order by hits
    .sort((keyword1, keyword2) => {
        if(keyword1.hits < keyword2.hits) return 1;
        /* istanbul ignore else */
        else if(keyword1.hits > keyword2.hits) return -1;
        /* istanbul ignore next */
        return 0;
    })
    .map(keyword => {
        //const unixTime = moment(keyword.lastTagged).unix();
               
        let fword: IFancyWord = {
            handle: keyword.handle,
            isRecent: moment(keyword.lastTagged)
                        .add(tilOld, 'days').isAfter(new Date(now * 1000)),
            trendiness: keyword.count / payload.entryCount 
                        * multiplier 
                        + minFontSize,
            isPopular: i < 4 //mark top 5 as popular
        };
        
        i++;
        return fword;
    })
    //alphabetize
    .sort((fword1, fword2) => {
        const handle1 = fword1.handle.toLowerCase();
        const handle2 = fword2.handle.toLowerCase();
        if(handle1 < handle2) return -1;
        /* istanbul ignore else */
        else if(handle1 > handle2) return 1;
        /* istanbul ignore next */
        return 0;
    });
}

const highlight = (handle: string) => {
    fWords.forEach((keyword) => {  
        keyword.selected = false;
        if(keyword.handle == handle)
            keyword.selected = true; 
    });
}

const notifyListener = (handle: string) => {
    Listener.keywordOn(handle);
}

export interface IWordCloudStore {
    getStore: () => Array<IFancyWord>;
}

class WordCloudStoreStatic extends AbstractStore implements IWordCloudStore {
    public getStore(): Array<IFancyWord> {
        return fWords;
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
        
        case ActionTypes.ENTRIES_RESET:
        notifyListener(null);
        break;
    }
}

Dispatcher.register(cb);