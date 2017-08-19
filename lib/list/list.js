import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import simpleComponentFactory from '../_base/simple-component-factory';

export const ListRoot = simpleComponentFactory(
	'ListRoot', 'div',
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
		<ListRoot className={classes} {...rest}>{children}</ListRoot>
	);
};

List.propTypes = {
	...ListRoot.propTypes,
	dense: PropTypes.bool,
	twoLine: PropTypes.bool,
	avatarList: PropTypes.bool
};

List.defaultProps = {
	...ListRoot.defaultProps,
	dense: false,
	twoLine: false,
	avatarList: false
};

export default List;