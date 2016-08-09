import * as React from 'react';
const jasmineEnzyme = require('jasmine-enzyme');
import { Tag } from '../Tag';
import { Blog } from '../Blog';
import { BlogEntry } from '../BlogEntry';
import { mount } from 'enzyme';
import { Ds } from '../../../../connector/DataSourceConnector';
import * as mock from '../../../../common/__tests__/MockEntryDriver';
import * as dom from '../../../../common/__tests__/functional/Dom';

dom.bootstrap();

describe('<Tag />', function() {
    beforeAll(() => {
        Ds.registerEntryDriver(mock.driver);
        jasmineEnzyme();    
    });
    
    it('populates the correct entries when clicked', () => {        
        const blogWrapper = mount(<Blog maxPerPage="3" />);
                  
        const treeTagWrapper = mount(<Tag handle="tree" />);
        treeTagWrapper.find('a').simulate('click');
        expect(blogWrapper.find(BlogEntry).length).toBe(3);
        expect(blogWrapper).toHaveState('entries', [mock.entry1, mock.entry2, mock.entry3]);
        
        const hardwoodTagWrapper = mount(<Tag handle="hardwood" />);
        hardwoodTagWrapper.find('a').simulate('click');
        expect(blogWrapper.find(BlogEntry).length).toBe(2);
        expect(blogWrapper).toHaveState('entries', [mock.entry1, mock.entry3]);
    });
});