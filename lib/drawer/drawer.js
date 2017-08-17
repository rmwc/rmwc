import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Drawer extends React.Component {
	static propTypes = {
		type: PropTypes.oneOf(['persistent', 'permanent'])
	}

	static defaultProps = {
		type: 'permanent'
	}

	componentDidMount() {

	}

	render() {
		const {
			className,
			children,
			type,
			...rest } = this.props;

		const classes = classNames(
			className,
			`mdc-${type}-drawer`
		);

		return (
			<aside className={classes} {...rest}>
				<nav className={`mdc-${type}-drawer__content`}>
					{children}
				</nav>
			</aside>
		);
	}
}

export default Drawer;