import { FancyKeyword } from './FancyWord'
import * as React from 'react';
import { WordCloudStore } from '../../../flux/stores/WordCloudStore'
import { Keyword } from 'pluto-rd'
import { IFancyWord } from '../../../common/IFancyWord';


export class WordCloud extends React.Component<{}, { fWords: IFancyWord[] } > {
    constructor() {
        super();
        this.state = { 
            fWords: WordCloudStore.getStore()
        }
    }
       
    public render() {
        let keywordEls = new Array<React.ReactElement<{}>>();
        
        this.state.fWords.forEach(keyword => {            
            keywordEls.push(<FancyKeyword
                                key = {keyword.handle} 
                                handle = {keyword.handle}
                                isRecent = {keyword.isRecent}
                                trendiness = {keyword.trendiness}
                                selected = {keyword.selected}
                            />)    
        });
        
        return (
            <div id="plrd-word-cloud">
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
        this.setState({
            fWords: WordCloudStore.getStore()
        });
    }
}