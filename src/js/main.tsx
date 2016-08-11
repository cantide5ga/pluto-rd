
import { Blog } from './react/components/blog/Blog';
import { WordCloud } from './react/components/wordcloud/WordCloud';
import { Home } from './react/components/Home';
import { Ds } from './connector/DataSourceConnector';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Keyword, EntryResult } from 'pluto-rd';

export { Blog }
export { WordCloud }
export { Ds }
export { Home }
export { Listener } from './config/Listener';
// export { React };
// export { ReactDOM };

export const blog = (
    entryDriver: (keyword: string, offset: number, count: number) => EntryResult,
    maxPerPage: number): Mounter => {
        
        Ds.registerEntryDriver(entryDriver);
        return new Mounter(<Blog maxPerPage={maxPerPage} />);           
    }
        
export const wordCloud = (
    keywords: Keyword[], 
    entryCount: number): Mounter => {
    
    Ds.registerKeywordDriver(keywords, entryCount);
    return new Mounter(<WordCloud />);
}

export const home = (): Mounter => {
    return new Mounter(<Home />);
}
    
class Mounter {
    private component;
    
    constructor(component: React.Component<any, any>) {
        this.component = component;
    }
    
    public mountTo(el: HTMLElement): void {
        ReactDOM.render(this.component, el);
    }
}