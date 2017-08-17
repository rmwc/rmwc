import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCToolbar } from '@material/toolbar';

export class Toolbar extends React.Component {
	static propTypes = {
		apiRef: PropTypes.func,
		fixed: PropTypes.bool,
		waterfall: PropTypes.bool,
		fixedLastrowOnly: PropTypes.bool,
		flexible: PropTypes.bool
	}

	static defaultProps = {
		apiRef: () => {},
		fixed: false,
		waterfall: false,
		fixedLastrowOnly: false,
		flexible: false
	}

	componentDidMount() {
		this.api = new MDCToolbar(this.el);
		this.props.apiRef(this.api);
	}

	render() {
		const { className, children, fixed, waterfall, fixedLastrowOnly, flexible, apiRef, ...rest } = this.props;

		const classes = classNames(
			'mdc-toolbar',
			className,
			{
				'mdc-toolbar--fixed': fixed,
				'mdc-toolbar--waterfall': waterfall,
				'mdc-toolbar--fixed-lastrow-only': fixedLastrowOnly,
				'mdc-toolbar--flexible': flexible
			}
		);
		return (
			<header ref={el => (this.el = el)} className={classes} {...rest}>
				{ children }
			</header>
		);
	}
}

export default Toolbar;