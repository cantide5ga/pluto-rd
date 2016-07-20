import { Dispatcher } from '../dispatcher/Dispatcher'
import { ActionTypes } from './ActionTypes'
import { AbstractActionCreator } from './AbstractActionCreator'
import { EntryResult } from 'pluto-rd';

class ActionCreator extends AbstractActionCreator {    
    public initGetEntries(
        fn:(keyword: string, offset: number, count: number) => EntryResult
    ) {
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
    
    public initBlog(max: number): void {
        this.dispatch({
            actionType: ActionTypes.BLOG_MOUNTED,
            payload: max    
        });
    }
    
    public clickPage(pageNum: number): void {
        this.dispatch({
            actionType: ActionTypes.PAGE_CLICK,
            payload: pageNum    
        });
    }
    
    public clickPrev(): void {
        this.dispatch({
            actionType: ActionTypes.PREV_PAGE
        });
    }
    
    public clickNext(): void {
        this.dispatch({
            actionType: ActionTypes.NEXT_PAGE
        });
    }
    
    public resetEntries(): void {
        this.dispatch({
            actionType: ActionTypes.ENTRIES_RESET
        });
    }
}

//singleton
export const BlogActionCreator: ActionCreator = new ActionCreator();