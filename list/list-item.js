import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple';

const RIPPLE_CLASSES = [
	'mdc-ripple-upgraded',
	'mdc-ripple-upgraded--background-active-fill',
	'mdc-ripple-upgraded--foreground-activation'
];

export class ListItem extends React.Component {
	static propTypes = {
		ripple: PropTypes.bool,
		wrap: PropTypes.bool
	}

	static defaultProps = {
		ripple: false,
		wrap: false
	}

	componentDidMount() {
		this.el = ReactDOM.findDOMNode(this);

		if (this.props.ripple) {
			MDCRipple.attachTo(this.el);
		}
	}

	render() {
		const {
			className,
			children,
			ripple,
			wrap,
			...rest } = this.props;

		const rippleClasses = (this.el ? this.el.getAttribute('class').split(' ') : [])
			.filter(cls => ~RIPPLE_CLASSES.indexOf(cls))
			.join(' ');

		const classes = classNames(
			'mdc-list-item',
			className,
			rippleClasses
		);

		const mergedProps = {
			...rest,
			className: classes
		};

		if (wrap) {
			return React.cloneElement(children, {
				...children.props,
				...mergedProps
			});
		} else {
			return (
				<div {...mergedProps}>{children}</div>
			);
		}
	}
}

export default ListItem;