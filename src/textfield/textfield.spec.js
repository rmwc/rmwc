import React from 'react';
import { mount } from 'enzyme';
import { Textfield } from './textfield';

describe('Textfield', () => {
	it('renders', () => {
		mount(<Textfield placeholder="test" />);
	});

	it('can have children', () => {
		mount(
			<Textfield placeholder="test">
				<div>Child</div>
			</Textfield>,
		);
	});

	it('can be bound', () => {
		const el = mount(
			<Textfield placeholder="test" value="hello world" onChange={evt => {}} />,
		);
		expect(el.find('input').getDOMNode().value).toBe('hello world');
	});
});
