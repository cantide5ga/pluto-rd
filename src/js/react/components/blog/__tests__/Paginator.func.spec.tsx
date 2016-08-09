import * as React from 'react';
const jasmineEnzyme = require('jasmine-enzyme');
import { Paginator } from '../Paginator';
import { Tag } from '../Tag';
import { Blog } from '../Blog';
import { BlogEntry } from '../BlogEntry';
import { mount, ReactWrapper } from 'enzyme';
import { Ds } from '../../../../connector/DataSourceConnector';
import * as mock from '../../../../common/__tests__/MockEntryDriver';
import * as dom from '../../../../common/__tests__/functional/Dom';

dom.bootstrap();

describe('<Paginator />', function() {
    beforeAll(() => {
        jasmineEnzyme();    
    });
    
    afterEach(() => {
        Ds.unregisterEntryDriver();
    });
       
    it('starts on the first page and contains the correct number of pages', () => {        
        const wrapper = initBlog(1);
        mount(<Tag handle="tree" />).find('a').simulate('click');
                  
        expect(wrapper.find('.plrd-prev')).toBeEmpty();
        expect(wrapper.find('.plrd-page-number').length).toBe(3);
        expect(wrapper.find('.plrd-next')).toBePresent();
    });
    
    it('does not display if no entries', () => {        
        const wrapper = mount(<Blog maxPerPage="1" />);
                  
        expect(wrapper.find('.plrd-prev')).toBeEmpty();
        expect(wrapper.find('.plrd-page-number')).toBeEmpty();
        expect(wrapper.find('.plrd-next')).toBeEmpty();
    });
    
    it('does not display if pages < 1', () => {        
        const wrapper = mount(<Blog maxPerPage="3" />);
        mount(<Tag handle="Betula" />).find('a').simulate('click');          
                  
        expect(wrapper.find('.plrd-prev')).toBeEmpty();
        expect(wrapper.find('.plrd-page-number')).toBeEmpty();
        expect(wrapper.find('.plrd-next')).toBeEmpty();
    });
    
    it('accentuates the current page', () => {        
        const wrapper = initBlog(1);
        mount(<Tag handle="tree" />).find('a').simulate('click');
        
        let pageEl = wrapper.find('.plrd-curr-page');
        expect(pageEl.length).toBe(1);
        expect(pageEl.text()).toBe('1');
        //expect(pageEls.at(0).find('.plrd-curr-page')).toBePresent();
        //expect(pageEls.at(0).text()).toEqual('1');

        wrapper.find('.plrd-next').simulate('click');
        pageEl = wrapper.find('.plrd-curr-page');
        expect(pageEl.length).toBe(1);
        expect(pageEl.text()).toBe('2');
    });
    
    it('does not display page-next if on last page', () => {        
        const wrapper = initBlog(1);
        mount(<Tag handle="tree" />).find('a').simulate('click');
        
        const pageEls = wrapper.find('.plrd-page-number');
        pageEls.at(2).find('a').simulate('click');
        
        expect(wrapper.find('.plrd-next')).toBeEmpty();
    });
    
    function initBlog(maxPerPage: number): ReactWrapper<any, any> {
        Ds.registerEntryDriver(mock.driver);
        return mount(<Blog maxPerPage={maxPerPage} />);
    }
});