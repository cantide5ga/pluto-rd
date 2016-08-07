import { WordCloudStore } from '../WordCloudStore';
import { IWordCloudStore } from '../WordCloudStore';
import { Keyword } from 'pluto-rd';
import { IFancyWord } from '../../../common/IFancyWord';
import { rig } from 'flux-test-rig';
import * as moment from 'moment';

const
    keyword1: Keyword = {
            handle: 'jack',
            count: 10,
            lastTagged: moment(new Date()).subtract(6, 'days').toDate(),
            hits: 10
        },
    keyword2: Keyword = {
            handle: 'queen',
            count: 5,
            lastTagged: moment(new Date()).subtract(2, 'days').toDate(),
            hits: 20
        },
    keyword3: Keyword = {
            handle: 'king',
            count: 5,
            lastTagged: moment(new Date()).subtract(2, 'days').toDate(),
            hits: 30
        },
    keyword4: Keyword = {
            handle: 'ace',
            count: 4,
            lastTagged: moment(new Date()).subtract(2, 'days').toDate(),
            hits: 40
        },
    keyword5: Keyword = {
            handle: 'joker',
            count: 3,
            lastTagged: moment(new Date()).subtract(10, 'days').toDate(),
            hits: 8
        },
    keyword6: Keyword = {
            handle: '10',
            count: 2,
            lastTagged: moment(new Date()).subtract(10, 'days').toDate(),
            hits: 5
        },
    keyword7: Keyword = {
            handle: '9',
            count: 1,
            lastTagged: moment(new Date()).subtract(10, 'days').toDate(),
            hits: 3
        },
    totalEntries = 100,
    keywords: Keyword[] = [
        keyword1,
        keyword2,
        keyword3,
        keyword4,
        keyword5,
        keyword6,
        keyword7
    ];

describe('WordCloudStore', () => {     
    it('correctly maps Keywords to FancyWords', () => {
        //TODO: cb name should be optional in flux-test-rig
        const rigged = rig<IWordCloudStore>('../WordCloudStore.js');
        const initKeywords = rigged.get('initKeywords');   
        
        initKeywords({ keywords: keywords, entryCount: totalEntries });
        
        const fWords = rigged.getStore('WordCloudStore').getStore();
        const getFWordWithHandle = (handle: string): IFancyWord => {
            return fWords.filter(fWord => {
                return fWord.handle == handle;    
            })[0];
        };
        
        const jack = getFWordWithHandle('jack');
        const queen = getFWordWithHandle('queen');
        const king = getFWordWithHandle('king');
        const ace = getFWordWithHandle('ace');
        const joker = getFWordWithHandle('joker');
        const ten = getFWordWithHandle('10');
        const nine = getFWordWithHandle('9');

        //assert popularity                
        expect(jack.isPopular).toBeTruthy();
        expect(queen.isPopular).toBeTruthy();
        expect(king.isPopular).toBeTruthy();
        expect(ace.isPopular).toBeTruthy();
        expect(joker.isPopular).toBeFalsy();              
        expect(ten.isPopular).toBeFalsy();
        expect(nine.isPopular).toBeFalsy();
        
        //assert isRecent
        expect(jack.isRecent).toBeFalsy();
        expect(queen.isRecent).toBeTruthy();
        expect(king.isRecent).toBeTruthy();
        expect(ace.isRecent).toBeTruthy();
        expect(joker.isRecent).toBeFalsy();
        expect(ten.isRecent).toBeFalsy();
        expect(nine.isRecent).toBeFalsy();
        
        //assert alphabetical order
        expect(fWords[0].handle).toBe('10');
        expect(fWords[1].handle).toBe('9');
        expect(fWords[2].handle).toBe('ace');
        expect(fWords[3].handle).toBe('jack');
        expect(fWords[4].handle).toBe('joker');
        expect(fWords[5].handle).toBe('king');
        expect(fWords[6].handle).toBe('queen');
    });
});