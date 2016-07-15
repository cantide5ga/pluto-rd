import * as React from 'react';
import { BlogActionCreator } from '../../../flux/actions/BlogActionCreator'

export class Tag extends React.Component<{ handle: string }, {}> {
    public render() {             
        return ( 
            <span className="tag">
                <a href="#" onClick={this.onClick}>
                        {this.props.handle}
                </a>
            </span>
        )
    }
    
    private onClick = ():void => {
        BlogActionCreator.clickTag(this.props.handle);
    }
}