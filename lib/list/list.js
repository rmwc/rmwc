import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const List = props => {
	const {
		className,
		dense,
		twoLine,
		avatarList,
		children,
		...rest } = props;

	const classes = classNames(
		'mdc-list',
		className,
		{
			'mdc-list--dense': dense,
			'mdc-list--two-line': twoLine,
			'mdc-list--avatar-list': avatarList
		}
	);
	return (
		<div className={classes} {...rest}>{children}</div>
	);
};

List.propTypes = {
	dense: PropTypes.bool,
	twoLine: PropTypes.bool,
	avatarList: PropTypes.bool
};

export default List;