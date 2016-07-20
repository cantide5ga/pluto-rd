import * as React from 'react';
import { BlogStore } from '../../../flux/stores/BlogStore'
import { BlogEntry } from './BlogEntry'
import { Entry } from 'pluto-rd'
import { BlogActionCreator } from '../../../flux/actions/BlogActionCreator'
import { Paginator } from './Paginator';

export class Blog extends React.Component<
            { maxPerPage: number}, 
            { entries: Entry[] }> {
                
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
            <div id="plrd-blog-entries">
                {entryEls}
                <Paginator
                    currPage = { BlogStore.getCurrentPage() }
                    pageCount = { BlogStore.getPageCount() }
                />
            </div>
        )
    }
       
    public componentDidMount() {
        BlogStore.addChangeListener(this.onChange);
        BlogActionCreator.initBlog(this.props.maxPerPage);
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