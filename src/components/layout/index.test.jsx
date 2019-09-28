import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';

import Layout from '.';

describe('<Layout />', () => {
    it('should render as a Layout', () => {
        const wrapper = mount(
            <Router>
                <Layout />
            </Router>
        );

        expect(wrapper.find('.ant-layout').length).toBe(1);
    });
});
