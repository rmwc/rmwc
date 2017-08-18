import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const simpleComponentFactory = (componentName = 'GenericComponent', defaultTag = 'div', tagProps = {className: ''}) => {
	const {className: tagPropsClassName, ...restTagProps} = tagProps;

	const Component = props => {
		const {
			className,
			wrap,
			tag,
			children,
			elementRef,
			...rest } = props;

		const classes = classNames(
			tagPropsClassName,
			className
		);

		const elementRefProp = elementRef ? {ref: elementRef} : {};

		const mergedProps = {
			className: classes,
			...elementRefProp,
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
		elementRef: PropTypes.func,
		tag: PropTypes.string,
		wrap: PropTypes.bool
	};

	Component.defaultProps = {
		elementRef: undefined,
		tag: defaultTag,
		wrap: false
	};

	Object.defineProperty(Component, 'name', {value: componentName, writable: false});

	return Component;
};

export default simpleComponentFactory;