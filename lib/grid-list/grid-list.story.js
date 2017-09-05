import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';
import { boolean, number, select } from '@storybook/addon-knobs';
import { GridList, GridTile, GridTilePrimary, GridTilePrimaryContent, GridTileSecondary, GridTileTitle } from './grid-list';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const cells = Array(24).fill();
const cellStyle = {
	padding: '16px',
	backgroundColor: '#f2f2f2'
};

const tileAspectOptions = {
	'1x1': '1x1',
	'16x9': '16x9',
	'2x3': '2x3',
	'3x2': '3x2',
	'4x3': '4x3',
	'3x4': '3x4'
};

storiesOf('GridLists', module)
	.add('Grid List', () => {
			return (
				<GridList
					gutter1={boolean('gutter1', false)}
					headerCaption={boolean('headerCaption', false)}
					twolineCaption={boolean('twolineCaption', false)}
					withIconAlignStart={boolean('withIconAlignStart', false)}
					tileAspect={select('tileAspect', tileAspectOptions, '1x1')}
				>
						{Array(4).fill().map((val, i) => (
							<GridTile key={i}>
								<GridTilePrimary>
									<GridTilePrimaryContent wrap>
										<img src="https://material-components-web.appspot.com/images/1-1.jpg"/>
									</GridTilePrimaryContent>
								</GridTilePrimary>
								<GridTileSecondary>
									<GridTileTitle>Tile {i + 1}</GridTileTitle>
								</GridTileSecondary>
							</GridTile>
						))}
				</GridList>
			)
		}
	)
