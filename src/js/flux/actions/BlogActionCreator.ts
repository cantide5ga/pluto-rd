import { Dispatcher } from '../dispatcher/Dispatcher'
import { ActionTypes } from './ActionTypes'
import { AbstractActionCreator } from './AbstractActionCreator'
import { Entry } from 'pluto-rd';

class ActionCreator extends AbstractActionCreator {    
    public initGetEntries(fn:(keyword: string) => Entry[]) {
        this.dispatch({
            actionType: ActionTypes.ENTRY_DRIVER_CONNECT,
            payload: fn
        });
    }
    
    public clickTag(handle:string): void {
        this.dispatch({
            actionType: ActionTypes.KEYWORD_CLICK,
            payload: handle 
        });
    }
}

//singleton
export const BlogActionCreator: ActionCreator = new ActionCreator();