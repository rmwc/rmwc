import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toolbar as mdcToolbar } from 'material-components-web';

import simpleComponentFactory from '../_base/simple-component-factory';


export const Theme = simpleComponentFactory('Theme', {
	tag: 'span',
	classNames: props => [
		{
			[`mdc-theme--${props.use}`]: props.use
		}
	],
	propTypes: {
		use: PropTypes.oneOf([
			'primary',
			'primary-light',
			'primary-dark',
			'secondary',
			'secondary-light',
			'secondary-dark',
			'background',
			'primary-bg',
			'primary-light-bg',
			'primary-dark-bg',
			'secondary-bg',
			'secondary-light-bg',
			'secondary-dark-bg',
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
			'text-primary-on-background',
			'text-secondary-on-background',
			'text-hint-on-background',
			'text-disabled-on-background',
			'text-icon-on-background',
			'text-primary-on-light',
			'text-secondary-on-light',
			'text-hint-on-light',
			'text-disabled-on-light',
			'text-icon-on-light',
			'text-primary-on-dark',
			'text-secondary-on-dark',
			'text-hint-on-dark',
			'text-disabled-on-dark',
			'text-icon-on-dark'
		]).isRequired
	},
	defaultProps: {
		use: undefined
	},
	propMeta: {
		use: {
			type: 'String',
			desc: 'Sets the text and color theme. Use can be: primary, primary-light, primary-dark, secondary, secondary-light, secondary-dark, background, primary-bg, primary-light-bg, primary-dark-bg, secondary-bg, secondary-light-bg, secondary-dark-bg, text-primary-on-primary, text-secondary-on-primary, text-hint-on-primary, text-disabled-on-primary, text-icon-on-primary, text-primary-on-secondary, text-secondary-on-secondary, text-hint-on-secondary, text-disabled-on-secondary, text-icon-on-secondary, text-primary-on-background, text-secondary-on-background, text-hint-on-background, text-disabled-on-background, text-icon-on-background, text-primary-on-light, text-secondary-on-light, text-hint-on-light, text-disabled-on-light, text-icon-on-light, text-primary-on-dark, text-secondary-on-dark, text-hint-on-dark, text-disabled-on-dark, text-icon-on-dark.'
		}
	},
	consumeProps: [
		'use'
	]
});

export default Theme;