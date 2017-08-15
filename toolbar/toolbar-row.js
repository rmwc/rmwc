import React from 'react';
import classNames from 'classnames';

export class ToolbarRow extends React.Component {
	render() {
		const { className, children, ...rest } = this.props;
		const classes = classNames(
			'mdc-toolbar__row',
			className
		);
		return (
			<div className={classes} {...rest}>
				{children}
			</div>
		);
	}
}

export default ToolbarRow;