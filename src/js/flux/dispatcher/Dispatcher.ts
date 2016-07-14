import { Dispatcher as ADispatcher} from 'flux';
import { Action } from '../actions/Action';

//use bluebird: https://facebook.github.io/flux/docs/todo-list.html#content

//singleton
export const Dispatcher: ADispatcher<Action> = new ADispatcher();