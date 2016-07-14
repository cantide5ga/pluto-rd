import { Component } from 'react';

declare namespace PlutoRd {
    interface Entry {
        title: string
        date: Date
        content: string
        keywords: string[]
    }
        
    interface Keyword {
        handle: string
        count: number
        recent: boolean
    }

    class Blog extends Component<{}, Entry[]> { }
    
    class WordCloud extends Component<{}, Keyword[]> { }
    
    namespace Ds {
        export function registerEntryDriver(queryFn: (keyword: string) => Entry[]): void
        export function registerKeywordDriver(keywords: Keyword[], entryCount: number): void
    }
}

export = PlutoRd