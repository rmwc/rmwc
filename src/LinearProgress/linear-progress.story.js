import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import { LinearProgress } from './';

storiesOf('Progress', module).add('LinearProgress', () => (
	<LinearProgress
		progress={number('progress', 0.5)}
		buffer={number('buffer', 0)}
		determinate={boolean('determinate', false)}
		reversed={boolean('reversed', false)}
		accent={boolean('accent', false)}
	/>
));
