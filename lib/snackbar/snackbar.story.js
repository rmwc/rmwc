import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { Snackbar } from './snackbar';

storiesOf('Snackbar', module)
	.add('Snackbar', () => (
		<Snackbar
			show={boolean('show', false)}
			onClose={action('onClose')}
			message={text('message', 'This is a new message')}
			actionText={text('actionText', 'Action')}
			actionHandler={() => alert('Action clicked')}
		/>
		)
	)
