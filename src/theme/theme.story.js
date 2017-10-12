import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';
import { boolean } from '@storybook/addon-knobs';
import { Theme } from './theme';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const themes = [
	'primary',
	'primary-light',
	'primary-dark',
	'secondary',
	'secondary-light',
	'secondary-dark',
	'background',
	'dark',
	'primary-bg',
	'primary-light-bg',
	'primary-dark-bg',
	'secondary-bg',
	'secondary-light-bg',
	'secondary-dark-bg',
	'text-primary-on-background',
	'text-secondary-on-background',
	'text-hint-on-background',
	'text-disabled-on-background',
	'text-icon-on-background',
	'text-primary-on-light',
	'text-secondary-on-light',
	'text-hint-on-light',
	'text-disabled-on-light',
	'text-icon-on-light'
];

const darkThemes = [
	'text-primary-on-primary',
	'text-secondary-on-primary',
	'text-hint-on-primary',
	'text-disabled-on-primary',
	'text-icon-on-primary',
	'text-primary-on-secondary',
	'text-secondary-on-secondary',
	'text-hint-on-secondary',
	'text-disabled-on-secondary',
	'text-icon-on-secondary',
	'text-primary-on-dark',
	'text-secondary-on-dark',
	'text-hint-on-dark',
	'text-disabled-on-dark',
	'text-icon-on-dark'
];

const themeStyle = {
	padding: '16px',
	margin: '16px',
	display: 'inline-block',
	width: '96px',
	height: '96px',
	verticalAlign: 'top'
};

const darkThemeStyle = {
	...themeStyle
};

storiesOf('Theme', module).add('Theme', () => (
	<div>
		<div style={{ backgroundColor: '#ddd' }}>
			<Theme use={['dark', 'text-hint-on-primary']} style={themeStyle}>
				Test
			</Theme>
			{themes.map((theme, i) => (
				<Theme key={i} use={theme} style={themeStyle}>
					{theme}
				</Theme>
			))}
		</div>
		<div style={{ backgroundColor: '#333' }}>
			{darkThemes.map((theme, i) => (
				<Theme key={i} use={theme} style={darkThemeStyle}>
					{theme}
				</Theme>
			))}
		</div>
	</div>
));
