import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { IconToggle } from './icon-toggle';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Buttons', module)
	.add('IconToggle', () => (
		<IconToggle
			on={{label: 'Remove from favorites', content: 'favorite'}}
			off={{label: 'Add to favorites', content: 'favorite_border'}}
		/>
		)
	)