import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/button';

export const DialogFooterButton = props => {
	const { cancel, accept, className, children, ...rest } = props;

	const classes = classNames(
		'mdc-dialog__footer__button',
		className,
		{
			'mdc-dialog__footer__button--cancel': cancel,
			'mdc-dialog__footer__button--accept': accept
		}
	);

	return (
		<Button className={classes} {...rest}>{ children }</Button>
	);
};

DialogFooterButton.propTypes = {
	...Button.propTypes,
	accept: PropTypes.bool,
	cancel: PropTypes.bool
};

DialogFooterButton.defaultProps = {
	...Button.defaultProps,
	accept: false,
	cancel: false
};

export default DialogFooterButton;