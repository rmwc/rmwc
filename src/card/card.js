import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import simpleComponentFactory from '../_base/simple-component-factory';
import Button from '../button/button';

export const CardPrimary = simpleComponentFactory('CardPrimary', {
	tag: 'section',
	classNames: 'mdc-card__primary'
});

export const CardTitle = simpleComponentFactory('CardTitle', {
	tag: 'h1',
	classNames: props => [
		'mdc-card__title',
		{
			'mdc-card__title--large': props.large
		}
	],
	propTypes: {
		large: PropTypes.bool
	},
	defaultProps: {
		large: false
	},
	consumeProps: [
		'large'
	]
});

export const CardSubtitle = simpleComponentFactory('CardSubtitle', {
	tag: 'h2',
	classNames: 'mdc-card__subtitle'
});

export const CardSupportingText = simpleComponentFactory('CardSupportingText', {
	tag: 'section',
	classNames: 'mdc-card__supporting-text'
});

export const CardActions = simpleComponentFactory('CardActions', {
	tag: 'section',
	classNames: 'mdc-card__actions'
});

export const CardMedia = simpleComponentFactory('CardMedia', {
	tag: 'section',
	classNames: 'mdc-card__media'
});

export const CardHorizontalBlock = simpleComponentFactory('CardHorizontalBlock', {
	className: 'mdc-card__media'
});

export const Card = simpleComponentFactory('Card', {
	classNames: 'mdc-card'
});

export const CardAction = props => {
	const { className, children, ...rest } = props;

	const classes = classNames(
		'mdc-card__action',
		className
	);

	return (
		<Button compact className={classes} {...rest}>{ children }</Button>
	);
};

CardAction.propTypes = {
	...Button.propTypes
};

CardAction.defaultProps = {
	...Button.defaultProps
};

export default Card;