import React from 'react';
import { mount } from 'enzyme';
import { Fab } from './fab';

describe('Fab', () => {
	it('renders', () => {
		const btn = mount(<Fab />);
		expect(!!~btn.html().search('mdc-fab')).toEqual(true);
	});

	it('can be plain', () => {
		const btn = mount(<Fab plain />);
		expect(!!~btn.html().search('mdc-fab--plain')).toEqual(true);
	});

	it('can be mini', () => {
		const btn = mount(<Fab mini />);
		expect(!!~btn.html().search('mdc-fab--mini')).toEqual(true);
	});

	it('can ripple', () => {
		const btn = mount(<Fab ripple />);
		expect(!!~btn.html().search('mdc-ripple-surface')).toEqual(true);
	});

	it('cannot ripple', () => {
		const btn = mount(<Fab ripple={false} />);
		expect(!!~btn.html().search('mdc-ripple-surface')).toEqual(false);
	});
});
