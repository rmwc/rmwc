import React from 'react';
import { mount } from 'enzyme';
import { Textfield } from './';

describe('Textfield', () => {
	it('renders', () => {
		mount(<Textfield placeholder="test" />);
	});

	it('can have children', () => {
		mount(
			<Textfield placeholder="test">
				<div>Child</div>
			</Textfield>
		);
	});

	it('can have custom classnames', () => {
		const el = mount(
			<Textfield placeholder="test" className="my-custom-classname">
				<div>Child</div>
			</Textfield>
		);

		const html = el.html();
		expect(
			!!~html.search('mdc-textfield') && !!~html.search('my-custom-classname')
		).toEqual(true);
	});

	it('can be bound', () => {
		const el = mount(
			<Textfield placeholder="test" value="hello world" onChange={evt => {}} />
		);
		expect(el.find('input').getDOMNode().value).toBe('hello world');
	});

	it('can be textarea', () => {
		const el = mount(
			<Textfield
				placeholder="test"
				value="hello world"
				textarea
				onChange={evt => {}}
			/>
		);
		expect(el.find('textarea').getDOMNode().value).toBe('hello world');
	});

	it('can have custom classnames on input', () => {
		const el = mount(<Textfield className={'my-custom-classname'} />);
		expect(!!~el.html().search('my-custom-classname')).toEqual(true);
	});
});
