import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCLinearProgress } from '@material/linear-progress';
import MDCComponentBase from '../_base/mdc-component-base';

import simpleComponentFactory from '../_base/simple-component-factory';

export const LinearProgressEl = simpleComponentFactory(
	'LinearProgressEl', 'nav',
	{
		className: 'mdc-linear-progress',
		role: 'progressbar'
	}
);

export const LinearProgressBufferingDotsEl = simpleComponentFactory(
	'LinearProgressBufferingDotsEl', 'div',
	{className: 'mdc-linear-progress__buffering-dots'}
);

export const LinearProgressBufferEl = simpleComponentFactory(
	'LinearProgressBufferEl', 'div',
	{className: 'mdc-linear-progress__buffer'}
);

export const LinearProgressPrimaryBarEl = simpleComponentFactory(
	'LinearProgressPrimaryBarEl', 'div',
	{className: 'mdc-linear-progress__bar mdc-linear-progress__primary-bar'}
);

export const LinearProgressSecondaryBarEl = simpleComponentFactory(
	'LinearProgressSecondaryBarEl', 'div',
	{className: 'mdc-linear-progress__bar mdc-linear-progress__secondary-bar'}
);

export const LinearProgressBarInnerEl = simpleComponentFactory(
	'LinearProgressBarInnerEl', 'div',
	{className: 'mdc-linear-progress__bar-inner'}
);

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
			className,
			{
				'mdc-linear-progress--indeterminate': !determinate,
				'mdc-linear-progress--reversed': reverse,
				'mdc-linear-progress--accent': accent
			}
		);

		return (
			<LinearProgressEl className={classes} { ...rest}>
				<LinearProgressBufferingDotsEl />
				<LinearProgressBufferEl />
				<LinearProgressPrimaryBarEl>
					<LinearProgressBarInnerEl />
				</LinearProgressPrimaryBarEl>
				<LinearProgressSecondaryBarEl>
					<LinearProgressBarInnerEl />
				</LinearProgressSecondaryBarEl>
			</LinearProgressEl>
		);
	}
}

export default LinearProgress;
