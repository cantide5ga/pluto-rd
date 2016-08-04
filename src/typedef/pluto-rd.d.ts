import { Component } from 'react';

declare namespace PlutoRd {
    interface Entry {
        title: string
        date: Date
        content: string
        keywords: string[]
    }
    
    interface EntryResult {
        pagedEntries: Entry[],
        totalCount: number    
    }
        
    interface Keyword {
        handle: string
        count: number
        lastTagged: Date
        hits: number
    }

    class Blog extends Component<{}, Entry[]> { }
    
    class WordCloud extends Component<{}, Keyword[]> { }
    
    namespace Ds {
        export function registerEntryDriver(
                queryFn: (keyword: string, offset: number, count: number) => Entry[]
            ): void
        export function registerKeywordDriver(keywords: Keyword[], entryCount: number): void
    }
}

export = PlutoRd