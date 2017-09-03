import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Fab } from './fab';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Buttons', module)
	.add('Fab', () => (
			<Fab
				mini={boolean('mini', false)}
				plain={boolean('plain', false)}
				ripple={boolean('ripple', true)}
				onClick={action('clicked')}
			>
				favorite
			</Fab>
		)
	)