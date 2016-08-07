import { Listener } from '../Listener';

describe('Listener', function() {     
    it('executes the event function if keyword added', () => {       
        const eventFnSpy = jasmine.createSpy('eventFn');       
        Listener.onKeyword('keywordA', eventFnSpy)
        Listener.onKeyword('keywordB', eventFnSpy)
        
        Listener.keywordOn('keywordA');
        expect(eventFnSpy).toHaveBeenCalled();
        Listener.keywordOn('keywordB');
        expect(eventFnSpy).toHaveBeenCalledTimes(2);
    });
    
     it('does not execute an event function if keyword not added', () => {
        const keywordElseOnSpy = spyOn(Listener, 'keywordElseOn');
        const eventFnSpy = jasmine.createSpy('eventFn');       
        Listener.onKeyword('keywordA', eventFnSpy)
        Listener.onKeyword('keywordB', eventFnSpy)
        
        Listener.keywordOn('keywordC');
        expect(eventFnSpy).not.toHaveBeenCalled();
        expect(keywordElseOnSpy).toHaveBeenCalled();
    });
    
    it('executes the default event function if keyword had been removed', () => {
        const keywordElseOn = spyOn(Listener, 'keywordElseOn').and.callThrough();
        const eventElseFn = jasmine.createSpy('eventElseFn');
        Listener.onKeywordElse(eventElseFn);
        //else function fires when initially set
        expect(eventElseFn).toHaveBeenCalled();
               
        Listener.onKeyword('keywordA', () => {});
        Listener.keywordOn('keywordA');
        expect(keywordElseOn).not.toHaveBeenCalled();
        //should have only been called when set above, but not on this flow
        expect(eventElseFn).toHaveBeenCalledTimes(1);
        
        Listener.removeKeyword('keywordA');
        Listener.keywordOn('keywordA');
        expect(keywordElseOn).toHaveBeenCalled();
        expect(eventElseFn).toHaveBeenCalledTimes(2);
    });
    
    it('noops when removing a non-existent listener', () => {
        Listener.removeKeyword('keywordZ');
    });
});
