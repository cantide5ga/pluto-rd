import * as React from 'react';
import { BlogActionCreator } from '../../../flux/actions/BlogActionCreator'

export class Paginator extends React.Component<{ currPage: number, pageCount: number }, {}> {
    private next: HTMLElement;
    private prev: HTMLElement;
    
    public constructor() {
        super();
        this.prev = 
                <a href="#" className="plrd-prev" onClick={this.onPrevClick}></a>;
                    
        this.next = 
                <a href="#" className="plrd-next" onClick={this.onNextClick}></a>;
    }
    
    public render() {        
        let pages = new Array<HTMLElement>();
        const count = this.props.pageCount;
        const currPage = this.props.currPage;           

        if(!(count <= 1)) {               
            for(let i = 1; i <= count; i++) {
                const isCurrPage = i == currPage;
                
                const classes = `plrd-page-number${isCurrPage ? ' plrd-curr-page' : ''}`;
                
                // no-op if clicked page number is current page
                const event = isCurrPage ? null : () => this.onPageClick(i);
                
                pages.push(
                    <span key={i} className={classes}>
                        <a href="#" onClick={ event }>
                                {i}
                        </a>
                    </span>
                )
            }
        }
                         
        return (
            <div className="plrd-paginator"> 
                { currPage > 1 ? this.prev: null }
                
                    { pages }
                    
                { currPage < count ? this.next: null }
            </div>     
        )
    }
    
    private onPageClick = (pageNum: number):void => {
        BlogActionCreator.clickPage(pageNum);
    }
    
    private onPrevClick = ():void => {
        BlogActionCreator.clickPrev();
    }
    
    private onNextClick = ():void => {
        BlogActionCreator.clickNext();
    }
}