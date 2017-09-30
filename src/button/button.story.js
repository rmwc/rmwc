import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';
import { boolean } from '@storybook/addon-knobs';
import { Button } from './button';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Buttons', module).add('Button', () => (
	<Button
		primary={boolean('primary', false)}
		accent={boolean('accent', false)}
		dense={boolean('dense', false)}
		raised={boolean('raised', false)}
		compact={boolean('compact', false)}
		ripple={boolean('ripple', true)}
		onClick={action('clicked')}
	>
		Button
	</Button>
));
