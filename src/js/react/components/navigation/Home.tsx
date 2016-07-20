import * as React from 'react';
import { BlogStore } from '../../../flux/stores/BlogStore'
import { Entry } from 'pluto-rd'
import { BlogActionCreator } from '../../../flux/actions/BlogActionCreator'

export class Home extends React.Component<{}, {}> {    
    public render() {          
        return (
            <button className="plrd-home" onClick={this.onClick}>
            </button>
        )
    }
           
    private onClick = ():void => {
        BlogActionCreator.resetEntries();
    }
}