import * as React from 'react';
import { Entry } from 'pluto-rd';
import * as moment from 'moment';
import { Tag } from './Tag';

export class BlogEntry extends React.Component<{ entry: Entry }, {}> { //stateless
    public render() {
        const date = moment.utc(this.props.entry.date).format('MMM DD YYYY');      

        let tagEls = new Array<string>();
        this.props.entry.keywords.forEach(keyword => {
            tagEls.push(
                <Tag
                    handle = { keyword }
                    key = { keyword }>
                </Tag> 
            );
        });

        return (
            <div className="entry">            
                <div className="entry-title">{this.props.entry.title}</div>
                <div className="entry-date">{date}</div>
                <p className="entry-content">{this.props.entry.content}</p>
                <span className="tag-list">
                    {tagEls}
                </span>      
            </div>
        )
    }
}