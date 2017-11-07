function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import simpleComponentFactory from '../Base/simple-component-factory';
import Button from '../Button';

export var CardPrimary = simpleComponentFactory('CardPrimary', {
	tag: 'section',
	classNames: 'mdc-card__primary'
});

export var CardTitle = simpleComponentFactory('CardTitle', {
	tag: 'h1',
	classNames: function classNames(props) {
		return ['mdc-card__title', {
			'mdc-card__title--large': props.large
		}];
	},
	propTypes: {
		large: PropTypes.bool
	},
	defaultProps: {
		large: false
	},
	consumeProps: ['large']
});

export var CardSubtitle = simpleComponentFactory('CardSubtitle', {
	tag: 'h2',
	classNames: 'mdc-card__subtitle'
});

export var CardSupportingText = simpleComponentFactory('CardSupportingText', {
	tag: 'section',
	classNames: 'mdc-card__supporting-text'
});

export var CardActions = simpleComponentFactory('CardActions', {
	tag: 'section',
	classNames: 'mdc-card__actions'
});

export var CardMedia = simpleComponentFactory('CardMedia', {
	tag: 'section',
	classNames: 'mdc-card__media'
});

export var CardHorizontalBlock = simpleComponentFactory('CardHorizontalBlock', {
	className: 'mdc-card__media'
});

export var Card = simpleComponentFactory('Card', {
	classNames: function classNames(props) {
		return ['mdc-card', {
			'mdc-card--theme-dark': props.themeDark
		}];
	},
	propTypes: {
		themeDark: PropTypes.bool
	},
	defaultProps: {
		themeDark: false
	},
	consumeProps: ['themeDark'],
	propMeta: {
		themeDark: {
			type: 'Boolean',
			desc: 'Use the cards dark theme.'
		}
	}
});

var CardAction = function CardAction(props) {
	var className = props.className,
	    children = props.children,
	    rest = _objectWithoutProperties(props, ['className', 'children']);

	var classes = classNames('mdc-card__action', className);

	return React.createElement(
		Button,
		Object.assign({ compact: true, className: classes }, rest),
		children
	);
};

export { CardAction };
CardAction.propTypes = Object.assign({}, Button.propTypes);

CardAction.defaultProps = Object.assign({}, Button.defaultProps);

export default Card;
