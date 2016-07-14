import { Dispatcher } from '../dispatcher/Dispatcher'
import { Action } from './Action'

export class AbstractActionCreator {    
    protected dispatch(action: Action) {
        Dispatcher.dispatch(action);
    }
}