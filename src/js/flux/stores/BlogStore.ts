import { Dispatcher } from '../dispatcher/Dispatcher';
import { ActionTypes } from '../actions/ActionTypes';
import { Action } from '../actions/Action';
import { AbstractStore } from './AbstractStore';
import { Ds } from '../../connector/DataSourceConnector';
import { Entry, EntryResult } from 'pluto-rd';

//https://github.com/bparadie/react-flux-typescript-todomvc/blob/master/src/flux/stores/TodoStore.ts
//https://github.com/FrontendMasters/2015-02-13-React/tree/master/excercises/5-flux/app/actions

let entries = new Array<Entry>();
let qryEntries: (keyword?: string, start?: number, end?: number) => EntryResult;

let currHandle: string = null;

let maxPerPage: number;
let currPage = 1;
let pageCount: number;
let totalCount: number; 

const loadEntries = ():void => {
    const offset = maxPerPage * (currPage - 1); // offset starts from 0, 
                                                //so subtract 1

    if(qryEntries) {
        const result = qryEntries(currHandle, offset, maxPerPage);

        if(result) {
            entries = result.pagedEntries || [];
            totalCount = result.totalCount || 0;    
        }        
    }
}

const resetHandle = (handle:string): void => {
    currHandle = handle;
    currPage = 1;
}

const initQryEntries = (payload: (keyword: string) => EntryResult): void => {
    qryEntries = payload;
}

const initBlog = (max: number) => {
    maxPerPage = max;
    loadEntries();
    computePages();
}

const computePages = (): void => {       
    const pages = Math.ceil(totalCount / maxPerPage);
    if(pages < maxPerPage) 
        pageCount = 1;
    else 
        pageCount = pages;
}

const toPage = (pageNum: number): void => {
    currPage = pageNum;
    loadEntries();
}

const prevPage = () => { 
    currPage--;
    loadEntries();  
}

const nextPage = () => { 
    currPage++;
    loadEntries(); 
}

//exported to improve testability
export class BlogStoreStatic extends AbstractStore {
    public getEntries(): Entry[] {
        return entries;
    }
    
    public getCurrentPage(): number {
        return currPage;
    }
    
    public getPageCount(): number {
        return pageCount;
    }
}

//singleton
export const BlogStore = new BlogStoreStatic();

const cb = (action: Action): void => {
    switch(action.actionType) {
        case ActionTypes.KEYWORD_CLICK:
        resetHandle(action.payload);
        loadEntries();
        computePages();
        BlogStore.emitChange();
        break;
        
        case ActionTypes.ENTRY_DRIVER_CONNECT:
        initQryEntries(action.payload);
        BlogStore.emitChange();
        break;
        
        case ActionTypes.BLOG_MOUNTED:
        initBlog(action.payload);
        BlogStore.emitChange();
        break;
               
        case ActionTypes.PAGE_CLICK:
        toPage(action.payload);
        BlogStore.emitChange();
        break;
        
        case ActionTypes.PREV_PAGE:
        prevPage();
        BlogStore.emitChange();
        break;
        
        case ActionTypes.NEXT_PAGE:
        nextPage();
        BlogStore.emitChange();
        break;
        
        case ActionTypes.ENTRIES_RESET:
        resetHandle(null);
        loadEntries();
        computePages();
        BlogStore.emitChange();
        break;
    }
};

Dispatcher.register(cb);