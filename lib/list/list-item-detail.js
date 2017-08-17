import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ListItemDetail = props => {
	const {
		className,
		start,
		end
	} = props;

	const classes = classNames(
		className,
		{
			'mdc-list-item__start-detail': start || (start === false && end === false),
			'mdc-list-item__end-detail': end
		}
	);
	return React.cloneElement(props.children, {
		...props.children.props,
		className: classes
	});
};

ListItemDetail.propTypes = {
	start: PropTypes.bool,
	end: PropTypes.bool
};

ListItemDetail.defaultProps = {
	start: false,
	end: false
};

export default ListItemDetail;