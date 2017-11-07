import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCLinearProgress } from '@material/linear-progress/dist/mdc.linearProgress';
import MDCComponentBase from '../Base/mdc-component-base';
import { propMeta } from '../Base/prop-meta';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export const LinearProgressRoot = simpleComponentFactory('LinearProgressRoot', {
	tag: 'nav',
	classNames: props => [
		'mdc-linear-progress',
		{
			'mdc-linear-progress--indeterminate': !props.determinate,
			'mdc-linear-progress--reversed': props.reversed,
			'mdc-linear-progress--accent': props.accent
		}
	],
	propTypes: {
		determinate: PropTypes.bool,
		reversed: PropTypes.bool,
		accent: PropTypes.bool
	},
	defaultProps: {
		role: 'progressbar',
		determinate: true,
		reversed: false,
		accent: false
	},
	consumeProps: ['determinate', 'reversed', 'accent']
});

export const LinearProgressBufferingDots = simpleComponentFactory(
	'LinearProgressBufferingDots',
	{
		classNames: 'mdc-linear-progress__buffering-dots'
	}
);

export const LinearProgressBuffer = simpleComponentFactory(
	'LinearProgressBuffer',
	{
		classNames: 'mdc-linear-progress__buffer'
	}
);

export const LinearProgressPrimaryBar = simpleComponentFactory(
	'LinearProgressPrimaryBar',
	{
		classNames: 'mdc-linear-progress__bar mdc-linear-progress__primary-bar'
	}
);

export const LinearProgressSecondaryBar = simpleComponentFactory(
	'LinearProgressSecondaryBar',
	{
		classNames: 'mdc-linear-progress__bar mdc-linear-progress__secondary-bar'
	}
);

export const LinearProgressBarInner = simpleComponentFactory(
	'LinearProgressBarInner',
	{
		classNames: 'mdc-linear-progress__bar-inner'
	}
);

export class LinearProgress extends MDCComponentBase {
	static MDCComponentClass = MDCLinearProgress;

	static propTypes = {
		progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		buffer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		determinate: PropTypes.bool,
		reversed: PropTypes.bool,
		accent: PropTypes.bool,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		progress: 0,
		buffer: undefined,
		determinate: true,
		reversed: false,
		accent: false,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		progress: {
			type: 'Float',
			desc: 'Progress float percentage between 0 and 1.'
		},
		buffer: {
			type: 'Float',
			desc: 'A Progress buffer float percentage between 0 and 1.'
		},
		determinate: {
			type: 'Boolean',
			desc: 'Whether or not the Progress bar is determinate.'
		},
		reversed: {
			type: 'Boolean',
			desc: 'Progress goes from right to left.'
		},
		accent: {
			type: 'Boolean',
			desc: 'Use the accent color palette.'
		},
		...MDCComponentBase.propMeta
	});

	MDCHandleProps(props) {
		['progress', 'buffer', 'determinate', 'reversed', 'accent'].forEach(key => {
			if (props[key] !== undefined && this.MDCApi[key] !== props[key]) {
				this.MDCApi[key] = props[key];
			}
		});
	}

	render() {
		const { progress, buffer, apiRef, ...rest } = this.props;

		return (
			<LinearProgressRoot
				elementRef={el => this.MDCSetRootElement(el)}
				{...rest}
			>
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
