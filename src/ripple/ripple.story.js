import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';
import { boolean } from '@storybook/addon-knobs';
import { Ripple } from './ripple';

const rippleStyle = {
	width: '240px',
	height: '240px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

storiesOf('Ripples', module)
	.add('Ripple', () => (
		<Ripple
			style={rippleStyle}
			primary={boolean('primary', false)}
			accent={boolean('accent', false)}
			unbounded={boolean('unbounded', false)}
		>
			<div style={rippleStyle}>Click Me</div>
		</Ripple>
		)
	)
