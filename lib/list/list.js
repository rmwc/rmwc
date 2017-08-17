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
		tag,
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

	const Tag = tag;

	return (
		<Tag className={classes} {...rest}>{children}</Tag>
	);
};

List.propTypes = {
	dense: PropTypes.bool,
	twoLine: PropTypes.bool,
	avatarList: PropTypes.bool,
	tag: PropTypes.string
};

List.defaultProps = {
	tag: 'div'
};

export default List;