class ListenerStatic {
    private listeners: { [keyword:string]: () => void } = {};
    private keywordElseFn: () => void;
           
    public onKeyword(keyword: string, fn: () => void): void {
        this.listeners[keyword] = fn;
    }
    
    public removeKeyword(keyword: string): void {
        if(this.listeners[keyword])
            delete this.listeners[keyword];
    }
    
    public onKeywordElse(fn: () => void): void {
        fn(); //assumes default
        this.keywordElseFn = fn;
    }
    
    public keywordOn(keyword: string): void {
        const fn = this.listeners[keyword];
        if(fn) 
            fn();
        else
            this.keywordElseOn();
    }
    
    private keywordElseOn() {
        const fn = this.keywordElseFn;
        /* istanbul ignore else */
        if(fn)
            fn();
    }
}

export const Listener = new ListenerStatic();


