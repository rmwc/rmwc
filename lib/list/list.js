import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import simpleComponentFactory from '../_base/simple-component-factory';

export const ListEl = simpleComponentFactory(
	'ListEl', 'div',
	{className: 'mdc-list'}
);

export const List = props => {
	const {
		className,
		dense,
		twoLine,
		avatarList,
		children,
		...rest } = props;

	const classes = classNames(
		className,
		{
			'mdc-list--dense': dense,
			'mdc-list--two-line': twoLine,
			'mdc-list--avatar-list': avatarList
		}
	);

	return (
		<ListEl className={classes} {...rest}>{children}</ListEl>
	);
};

List.propTypes = {
	...ListEl.propTypes,
	dense: PropTypes.bool,
	twoLine: PropTypes.bool,
	avatarList: PropTypes.bool
};

List.defaultProps = {
	...ListEl.defaultProps,
	dense: false,
	twoLine: false,
	avatarList: false
};

export default List;