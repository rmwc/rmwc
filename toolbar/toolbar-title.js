import React from 'react';
import classNames from 'classnames';

export class ToolbarTitle extends React.Component {
	render() {
		const { className, children, ...rest } = this.props;
		const classes = classNames(
			'mdc-toolbar__title',
			className
		);
		return (
			<span className={classes} {...rest}>{children}</span>
		);
	}
}

export default ToolbarTitle;