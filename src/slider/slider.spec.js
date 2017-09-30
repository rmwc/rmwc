import React from 'react';
import { mount } from 'enzyme';
import { Slider } from './slider';

describe('Slider', () => {
	it('renders', () => {
		const el = mount(<Slider value={50} onChange={() => {}} />);
		expect(!!~el.html().search('mdc-slider')).toBe(true);
	});

	it('can be discrete', () => {
		const el = mount(<Slider value={50} discrete />);
		expect(!!~el.html().search('mdc-slider--discrete')).toBe(true);
	});

	it('can have displayMarkers', () => {
		const el = mount(<Slider value={50} discrete displayMarkers />);
		expect(!!~el.html().search('mdc-slider--display-markers')).toBe(true);
	});
});
