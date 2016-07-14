import { FancyKeywordProps } from './FancyKeywordProps';
import * as React from 'react';
import { WordCloudActionCreator } from '../../../flux/actions/WordCloudActionCreator'

export class FancyKeyword extends React.Component<FancyKeywordProps, {}> { //dumb component; stateless
    public render() {
        const classes = `${this.props.recent ? 'recent': ''}`;     
        const style: React.CSSProperties = {
            fontSize: this.props.trendiness 
        }
             
        return ( 
            <a 
                onClick={this.onClick}
                className={classes} 
                style={style}>
                    {this.props.handle}
            </a>
        )
    }
    
    private onClick = ():void => {
        WordCloudActionCreator.clickKeyword(this.props.handle);
    }
}