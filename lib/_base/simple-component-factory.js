import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const simpleComponentFactory = (defaultTag = 'div', tagProps = {className: ''}) => {
	const {className: tagPropsClassName, ...restTagProps} = tagProps;

	const Component = props => {
		const {
			className,
			wrap,
			tag,
			children,
			...rest } = props;

		const classes = classNames(
			tagPropsClassName,
			className
		);

		const mergedProps = {
			className: classes,
			...restTagProps,
			...rest
		};

		const Tag = tag;

		if (wrap) {
			return React.cloneElement(children, {
				...children.props,
				...mergedProps
			});
		} else {
			return (
				<Tag {...mergedProps}>{children}</Tag>
			);
		}
	};

	Component.propTypes = {
		wrap: PropTypes.bool,
		tag: PropTypes.string
	};

	Component.defaultProps = {
		wrap: false,
		tag: defaultTag
	};

	return Component;
};

export default simpleComponentFactory;