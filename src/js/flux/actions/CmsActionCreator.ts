import { Dispatcher } from '../dispatcher/Dispatcher'
import { ActionTypes } from './ActionTypes'
import { AbstractActionCreator } from './AbstractActionCreator'
import { Entry } from 'pluto-rd';

class ActionCreator extends AbstractActionCreator {
    public submit(entry: Entry): void {
        this.dispatch({
            actionType: ActionTypes.CMS_SUBMIT,
            payload: entry 
        });
    }
}

//singleton
export const CmsActionCreator: ActionCreator = new ActionCreator();