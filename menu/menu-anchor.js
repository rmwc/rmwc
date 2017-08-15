import React from 'react';
import classNames from 'classnames';

export class MenuAnchor extends React.Component {
	render() {
		const {
			className,
			children,
			...rest } = this.props;

		const classes = classNames(
			'mdc-menu-anchor',
			className
		);
		return (
			<div className={classes} {...rest}>{children}</div>
		);
	}
}

export default MenuAnchor;