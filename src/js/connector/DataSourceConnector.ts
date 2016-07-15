import { Keyword, Entry } from 'pluto-rd';
import { WordCloudActionCreator } from '../flux/actions/WordCloudActionCreator';
import { BlogActionCreator } from '../flux/actions/BlogActionCreator';

// data exchange logic
class DataSourceConnectorStatic {    
    public registerEntryDriver = (queryFn: (keyword: string) => Entry[]): void => {
        BlogActionCreator.initGetEntries(queryFn);
    } 

    public registerKeywordDriver = (keywords: Keyword[], entryCount: number): void => {
        const data = {
            keywords: keywords, 
            entryCount: entryCount
        }        
        WordCloudActionCreator.initKeywords(data);
    }
}

export const Ds = new DataSourceConnectorStatic();

