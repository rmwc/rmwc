import React from 'react';
import { mount } from 'enzyme';
import {
	Card,
	CardMedia,
	CardPrimary,
	CardTitle,
	CardSubtitle,
	CardSupportingText,
	CardActions,
	CardAction
} from './';

describe('Card', () => {
	it('renders', () => {
		mount(
			<Card style={{ width: '320px' }}>
				<CardMedia
					style={{
						height: '12.313rem'
					}}
				/>
				<CardPrimary>
					<CardTitle large>Card Title</CardTitle>
					<CardSubtitle>Subtitle here</CardSubtitle>
				</CardPrimary>
				<CardSupportingText />
				<CardActions>
					<CardAction>Action 1</CardAction>
					<CardAction>Action 2</CardAction>
				</CardActions>
			</Card>
		);
	});

	it('can be dark', () => {
		const card = mount(<Card themeDark />);
		expect(!!~card.html().search('mdc-card--theme-dark')).toEqual(true);
	});

	it('can have custom classes', () => {
		[
			Card,
			CardMedia,
			CardPrimary,
			CardTitle,
			CardSubtitle,
			CardSupportingText,
			CardActions,
			CardAction
		].forEach(Component => {
			const el = mount(<Component className={'my-custom-classname'} />);
			expect(!!~el.html().search('my-custom-classname')).toEqual(true);
		});
	});
});
