import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const FormField = props => {
	const { className, children, ...rest } = props;
	const classes = classNames(
		'mdc-form-field',
		className
	);
	return (
		<div className={classes} {...props}>{children}</div>
	);
}

export default FormField;