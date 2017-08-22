import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple';

export class Ripple extends React.Component {
	static propTypes = {
		unbounded: PropTypes.bool,
		primary: PropTypes.bool,
		accent: PropTypes.bool
	}

	static defaultProps = {
		unbounded: false,
		primary: false,
		accent: false
	}

	componentDidMount() {
		this.el = ReactDOM.findDOMNode(this);
		this.api = new MDCRipple(this.el);
		this.checkProps(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkProps(nextProps);
	}

	checkProps(nextProps) {
		if (this.api.unbounded !== nextProps.unbounded) {
			this.api.unbounded = nextProps.unbounded;
		}

		console.log(this.api.unbounded, this.api);
	}

	render() {
		const child = React.Children.only(this.props.children);
		const { accent, primary } = this.props;
		// const rippleClasses = (this.el ? this.el.getAttribute('class').split(' ') : [])
		// 	.filter(cls => cls.startsWith('mdc-ripple'));

		const classes = classNames(
			'mdc-ripple-surface',
			child.props.className,
			{
				'mdc-ripple-surface--primary': primary,
				'mdc-ripple-surface--accent': accent
			}
		);

		const dedupedClasses = Array.from(new Set(classes.split(' '))).join(' ');

		return React.cloneElement(child, {
			...child.props,
			className: dedupedClasses
		});
	}
}

export default Ripple;