import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import simpleComponentFactory from '../_base/simple-component-factory';

const TypographyBase = simpleComponentFactory('TypographyBase', 'span');

export const Typography = props => {
	const {
		className,
		children,
		display4,
		display3,
		display2,
		display1,
		headline,
		title,
		subheading2,
		subheading1,
		body2,
		body1,
		caption,
		button,
		...rest
	} = props;

	const classes = classNames(
		className,
		{
			'mdc-typography--display4': display4,
			'mdc-typography--display3': display3,
			'mdc-typography--display2': display2,
			'mdc-typography--display1': display1,
			'mdc-typography--headline': headline,
			'mdc-typography--title': title,
			'mdc-typography--subheading2': subheading2,
			'mdc-typography--subheading1': subheading1,
			'mdc-typography--body2': body2,
			'mdc-typography--body1': body1,
			'mdc-typography--caption': caption,
			'mdc-typography--button': button
		}
	);

	return (
		<TypographyBase className={classes} {...rest}>{children}</TypographyBase>
	);
};

Typography.propTypes = {
	...TypographyBase.propTypes,
	display4: PropTypes.bool,
	display3: PropTypes.bool,
	display2: PropTypes.bool,
	display1: PropTypes.bool,
	headline: PropTypes.bool,
	title: PropTypes.bool,
	subheading2: PropTypes.bool,
	subheading1: PropTypes.bool,
	body2: PropTypes.bool,
	body1: PropTypes.bool,
	caption: PropTypes.bool,
	button: PropTypes.bool
};

Typography.defaultProps = {
	...TypographyBase.defaultProps,
	display4: false,
	display3: false,
	display2: false,
	display1: false,
	headline: false,
	title: false,
	subheading2: false,
	subheading1: false,
	body2: false,
	body1: false,
	caption: false,
	button: false
};

export default Typography;