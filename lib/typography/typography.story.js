import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Typography } from './typography';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Typography', module)
	.add('Typography', () => (
		<div>
			<Typography tag="div" style={{margin: '16px 0'}} kind="display4">display4</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="display3">display3</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="display2">display2</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="display1">display1</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="headline">headline</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="title">title</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="subheading2">subheading2</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="subheading1">subheading1</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="body2">body2</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="body1">body1</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="caption">caption</Typography>
			<Typography tag="div" style={{margin: '16px 0'}} kind="button">button</Typography>
		</div>
	))