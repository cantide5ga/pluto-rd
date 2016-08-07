import { IWordCloudStore } from '../../flux/stores/WordCloudStore';
import { ActionTypes } from '../../flux/actions/ActionTypes';
import { Action } from '../../flux/actions/Action';
import { rig } from 'flux-test-rig';
import { Listener } from '../Listener';

describe('Listener integration', () => {     
    it('executes default event function on ENTRIES_RESET', () => {
        const rigged = rig<IWordCloudStore>('../../flux/stores/WordCloudStore.js', 'cb');
        
        const notifyListener = rigged.getSpy('notifyListener').and.callThrough();
        const keywordOn = spyOn(Listener, 'keywordOn').and.callThrough();
        const eventElseFn = jasmine.createSpy('eventElseFn');
        Listener.onKeywordElse(eventElseFn);
                
        const action: Action = {
            actionType: ActionTypes.ENTRIES_RESET
        }
        
        rigged.invokeAction(action);
        expect(notifyListener).toHaveBeenCalledWith(null);
        expect(keywordOn).toHaveBeenCalledWith(null);
        expect(eventElseFn).toHaveBeenCalledTimes(2); //once before when set         
    });
});