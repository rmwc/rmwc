import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple';
import { getProviderOptions } from '../provider/provider';

export class Fab extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		mini: PropTypes.bool,
		plain: PropTypes.bool,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		mini: false,
		plain: false
	}

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	componentDidMount() {
		const { buttonDefaultRipple } = this.providerOptions;
		const shouldRipple = this.props.ripple === undefined
			? buttonDefaultRipple
			: this.props.ripple;

		if (shouldRipple) {
			MDCRipple.attachTo(ReactDOM.findDOMNode(this));
		}
	}

	render() {
		const {
			className,
			children,
			mini,
			plain,
			ripple,
			...rest } = this.props;

		const classes = classNames(
			'mdc-fab',
			this.providerOptions.iconPrefix,
			className,
			{
				'mdc-fab--mini': mini,
				'mdc-fab--plain': plain
			}
		);
		return (
			<button className={classes} {...rest}>
				<span className="mdc-fab__icon">
					{children}
				</span>
			</button>
		);
	}
}

export default Fab;