import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';

export const IconButton = props => {
	// styles ripped from Angular Material https://material.angularjs.org/latest/demo/button
	const style = {
		margin: '0 6px',
    height: '40px',
    minWidth: '0',
    lineHeight: '24px',
    padding: '8px',
    width: '40px',
    borderRadius: '50%'
	}
	return (
		<Button style={style} {...props}>{props.children}</Button>
	);
}

export default IconButton;