import { FancyKeywordProps } from './FancyKeywordProps';
import * as React from 'react';
import { WordCloudActionCreator } from '../../../flux/actions/WordCloudActionCreator'

export class FancyKeyword extends React.Component<FancyKeywordProps, {}> { //dumb component; stateless
    public render() {
        const classes = `${this.props.recent ? 'trendy-keyword' : ''}`
                        + `${this.props.selected ? ' keyword-highlighted' : ''}`;     
        const style: React.CSSProperties = {
            fontSize: this.props.trendiness,
            // fontStyle: this.props.recent ? 'italic' : 'none',
            // fontWeight: this.props.selected ? 'bold' : 'normal' 
        }
             
        return ( 
            <span className="word-cloud-keyword">
                <a 
                    href="#"
                    onClick={this.onClick}
                    className={classes} 
                    style={style}>
                        {this.props.handle}
                </a>
            </span>
        )
    }
    
    private onClick = ():void => {
        WordCloudActionCreator.clickKeyword(this.props.handle);
    }
}