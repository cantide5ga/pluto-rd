import { FancyKeyword } from './FancyKeyword'
import * as React from 'react';
import { WordCloudStore } from '../../../flux/stores/WordCloudStore'
import { Keyword } from 'pluto-rd';

export class WordCloud extends React.Component<{}, { keywords: Keyword[], totalEntries: number }> {
    constructor() {
        super();
        this.state = WordCloudStore.getStore();
    }
       
    public render() {
        let keywordEls = new Array<React.ReactElement<{}>>();
        
        this.state.keywords.forEach(keyword => {
            keywordEls.push(<FancyKeyword
                                key = {keyword.handle} 
                                handle = {keyword.handle}
                                recent = {keyword.recent}
                                trendiness = {12} 
                            />)
                            //trendiness = {keyword.count / (this.state.totalEntries || 1)}    
        });
        
        return (
            <div>
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
        this.setState(WordCloudStore.getStore());
    }
}