import * as React from 'react';
import { BlogStore } from '../../../flux/stores/BlogStore'
import { BlogEntry } from './BlogEntry'
import { Entry } from 'pluto-rd'

export class Blog extends React.Component<{}, { entries: Entry[] }> {
    constructor() {
        super();
        this.state =  {
            entries: BlogStore.getEntries()
        }
    }
    
    public render() {
        let entryEls = new Array<React.ReactElement<{}>>();

        this.state.entries.forEach(entry => {
            const entryProps: Entry = {
                title: entry.title,
                date: entry.date,
                content: entry.content,
                keywords: entry.keywords,
            }
            
            entryEls.push(<BlogEntry 
                            key = {`${entry.title}${entry.date}`}
                            entry = {entryProps}                               
                        />)
        });
           
        return (
            <div id="blog-entries">
                {entryEls}
            </div>
        )
    }
       
    public componentDidMount() {
        BlogStore.addChangeListener(this.onChange);
    }
    
    public componentWillUnmount() {
        BlogStore.removeChangeListener(this.onChange);
    }
    
    private onChange = () => {
        this.setState({
            entries: BlogStore.getEntries()
        });
    }
}