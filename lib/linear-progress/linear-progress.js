import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCLinearProgress } from '@material/linear-progress';
import MDCComponentBase from '../_base/mdc-component-base';

export class LinearProgress extends MDCComponentBase {
	static MDCComponentClass = MDCLinearProgress;

	static propTypes = Object.assign({}, MDCComponentBase.propTypes, {
		progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		buffer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		determinate: PropTypes.bool,
		reverse: PropTypes.bool,
		accent: PropTypes.bool
	})

	static defaultProps = Object.assign({}, MDCComponentBase.defaultProps, {
		progress: 0,
		buffer: undefined,
		determinate: true,
		reverse: false,
		accent: false
	})

	MDCHandleProps(props) {
		['progress', 'buffer', 'determinate', 'reverse', 'accent'].forEach(key => {
			if (props[key] !== undefined && this.MDCApi[key] !== props[key]) {
				this.MDCApi[key] = props[key];
			}
		});
	}

	render() {
		const {progress, determinate, reverse, buffer, accent, className, apiRef, ...rest} = this.props;

		const classes = classNames(
			'mdc-linear-progress',
			className,
			{
				'mdc-linear-progress--indeterminate': !determinate,
				'mdc-linear-progress--reversed': reverse,
				'mdc-linear-progress--accent': accent
			}
		);

		return (
			<div role="progressbar" className={classes} { ...rest}>
				<div className="mdc-linear-progress__buffering-dots"></div>
				<div className="mdc-linear-progress__buffer"></div>
				<div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
					<span className="mdc-linear-progress__bar-inner"></span>
				</div>
				<div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
					<span className="mdc-linear-progress__bar-inner"></span>
				</div>
			</div>
		);
	}
}

export default LinearProgress;
