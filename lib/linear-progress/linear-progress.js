import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCLinearProgress } from '@material/linear-progress';
import MDCComponentBase from '../_base/mdc-component-base';

import { simpleComponentFactory } from '../_base/simple-component-factory';

export const LinearProgressRoot = simpleComponentFactory('LinearProgressRoot', {
	tag: 'nav',
	classNames: props => [
		'mdc-linear-progress',
		{
			'mdc-linear-progress--indeterminate': !props.determinate,
			'mdc-linear-progress--reversed': props.reverse,
			'mdc-linear-progress--accent': props.accent
		}
	],
	propTypes: {
		determinate: PropTypes.bool,
		reverse: PropTypes.bool,
		accent: PropTypes.bool
	},
	defaultProps: {
		role: 'progressbar',
		determinate: true,
		reverse: false,
		accent: false
	},
	consumeProps: [
		'determinate',
		'reverse',
		'accent'
	]
});

export const LinearProgressBufferingDots = simpleComponentFactory('LinearProgressBufferingDots', {
	classNames: 'mdc-linear-progress__buffering-dots'
});

export const LinearProgressBuffer = simpleComponentFactory('LinearProgressBuffer', {
	classNames: 'mdc-linear-progress__buffer'
});

export const LinearProgressPrimaryBar = simpleComponentFactory('LinearProgressPrimaryBar', {
	classNames: 'mdc-linear-progress__bar mdc-linear-progress__primary-bar'
});

export const LinearProgressSecondaryBar = simpleComponentFactory('LinearProgressSecondaryBar', {
	classNames: 'mdc-linear-progress__bar mdc-linear-progress__secondary-bar'
});

export const LinearProgressBarInner = simpleComponentFactory('LinearProgressBarInner', {
	classNames: 'mdc-linear-progress__bar-inner'
});

export class LinearProgress extends MDCComponentBase {
	static MDCComponentClass = MDCLinearProgress;

	static propTypes = {
		...MDCComponentBase.propTypes,
		progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		buffer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		determinate: PropTypes.bool,
		reverse: PropTypes.bool,
		accent: PropTypes.bool
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		progress: 0,
		buffer: undefined,
		determinate: true,
		reverse: false,
		accent: false
	}

	MDCHandleProps(props) {
		['progress', 'buffer', 'determinate', 'reverse', 'accent'].forEach(key => {
			if (props[key] !== undefined && this.MDCApi[key] !== props[key]) {
				this.MDCApi[key] = props[key];
			}
		});
	}

	render() {
		const {progress, buffer, apiRef, ...rest} = this.props;

		return (
			<LinearProgressRoot elementRef={el => this.MDCSetRootElement(el)} { ...rest}>
				<LinearProgressBufferingDots />
				<LinearProgressBuffer />
				<LinearProgressPrimaryBar>
					<LinearProgressBarInner />
				</LinearProgressPrimaryBar>
				<LinearProgressSecondaryBar>
					<LinearProgressBarInner />
				</LinearProgressSecondaryBar>
			</LinearProgressRoot>
		);
	}
}

export default LinearProgress;
