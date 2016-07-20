import { ActionTypes } from './ActionTypes'

export interface Action {
    actionType: ActionTypes,
    payload?: any
}