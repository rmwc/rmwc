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
} from './card';

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
});
