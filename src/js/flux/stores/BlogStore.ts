import { Dispatcher } from '../dispatcher/Dispatcher';
import { ActionTypes } from '../actions/ActionTypes';
import { Action } from '../actions/Action';
import { AbstractStore } from './AbstractStore';
import { Ds } from '../../connector/DataSourceConnector';
import { Entry } from 'pluto-rd';

//https://github.com/bparadie/react-flux-typescript-todomvc/blob/master/src/flux/stores/TodoStore.ts
//https://github.com/FrontendMasters/2015-02-13-React/tree/master/excercises/5-flux/app/actions

let entries = new Array<Entry>();
let qryEntries: (keyword: string) => Entry[];

const loadEntries = (handle:string):void => {
    entries = qryEntries ? qryEntries(handle) || [] : [];
}

const initQryEntries = (payload: (keyword: string) => Entry[]): void => {
    qryEntries = payload;
}

//exported to improve testability
export class BlogStoreStatic extends AbstractStore {
    public getEntries(): { entries: Entry[] } {
        return {
            entries: entries
        }
    }
}

//singleton
export const BlogStore = new BlogStoreStatic();

const cb = (action: Action): void => {
    switch(action.actionType) {
        case ActionTypes.KEYWORD_CLICK:
        loadEntries(action.payload);
        BlogStore.emitChange();
        break;
        
        case ActionTypes.ENTRY_DRIVER_CONNECT:
        initQryEntries(action.payload);
        BlogStore.emitChange();
        break;
    }
};

Dispatcher.register(cb);