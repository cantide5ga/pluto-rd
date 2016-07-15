import { FancyKeyword } from './FancyKeyword'
import * as React from 'react';
import { WordCloudStore } from '../../../flux/stores/WordCloudStore'
import { Keyword } from 'pluto-rd'

export class WordCloud extends React.Component<{}, { keywords: Keyword[], totalEntries: number }> {
    constructor() {
        super();
        const store = WordCloudStore.getStore();
        this.state = { 
            keywords: store.keywords, 
            totalEntries: store.totalEntries 
        };
    }
       
    public render() {
        const maxFontSize = 32;
        const minFontSize = 8;
        const multiplier = maxFontSize - minFontSize;
        
        let keywordEls = new Array<React.ReactElement<{}>>();
        
        this.state.keywords.forEach(keyword => {
            const trendiness = keyword.count / this.state.totalEntries 
                        * multiplier 
                        + minFontSize
            
            keywordEls.push(<FancyKeyword
                                key = {keyword.handle} 
                                handle = {keyword.handle}
                                recent = {keyword.recent}
                                trendiness = {trendiness}
                                selected = {keyword.selected}
                            />)    
        });
        
        return (
            <div id="word-cloud">
                {keywordEls}
            </div>
        )
    }

    public componentDidMount() {
        WordCloudStore.addChangeListener(this.onChange);
    }
    
    public componentWillUnmount() {
        WordCloudStore.removeChangeListener(this.onChange);
    }
    
    private onChange = () => {
        const store = WordCloudStore.getStore();
        this.setState(
            { 
                keywords: store.keywords, 
                totalEntries: store.totalEntries
            }
        );
    }
}