import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';
import { boolean, number } from '@storybook/addon-knobs';
import { Grid, GridCell } from './';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const cells = Array(24).fill();
const cellStyle = {
	padding: '16px',
	backgroundColor: '#f2f2f2'
};

storiesOf('Grids', module).add('Grid', () => {
	const span = number('span', 4);
	return (
		<Grid>
			{cells.map((val, i) => (
				<GridCell style={cellStyle} span={span} key={i}>
					{i}
				</GridCell>
			))}
		</Grid>
	);
});
