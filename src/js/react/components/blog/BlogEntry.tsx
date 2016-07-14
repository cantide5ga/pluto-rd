import * as React from 'react';
import { Entry } from 'pluto-rd';
import * as moment from 'moment';

export class BlogEntry extends React.Component<Entry, {}> { //stateless
    public render() {
        const date = moment.utc(this.props.date).format('MMM DD YYYY');      
        
        return (
            <div>            
                <h1>{this.props.title}</h1>
                <h5>{date}</h5>
                <p>{this.props.content}</p>
                <span>{this.props.keywords.join(', ')}</span>      
            </div>
        )
    }
}