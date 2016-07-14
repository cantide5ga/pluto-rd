import { Dispatcher } from '../dispatcher/Dispatcher'
import { ActionTypes } from './ActionTypes'
import { AbstractActionCreator } from './AbstractActionCreator'
import { Keyword } from 'pluto-rd';

class ActionCreator extends AbstractActionCreator {
    public clickKeyword(handle:string): void {
        this.dispatch({
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: handle 
        });
    }
    
    public initKeywords( data: { keywords: Keyword[], entryCount: number }) {
        this.dispatch({
            actionType: ActionTypes.KEYWORD_DRIVER_CONNECT,
            payload: data
        });
    }
}

//singleton
export const WordCloudActionCreator:  ActionCreator = new ActionCreator();