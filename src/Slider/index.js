import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCSlider } from '@material/slider/dist/mdc.slider';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export const SliderRoot = simpleComponentFactory('SliderRoot', {
	classNames: 'mdc-slider'
});

export const SliderTrackContainer = simpleComponentFactory(
	'SliderTrackContainer',
	{
		classNames: 'mdc-slider__track-container'
	}
);

export const SliderTrack = simpleComponentFactory('SliderTrack', {
	classNames: 'mdc-slider__track'
});

export const SliderTrackMarkerContainer = simpleComponentFactory(
	'SliderTrackMarkerContainer',
	{
		classNames: 'mdc-slider__track-marker-container'
	}
);

export const SliderThumbContainer = simpleComponentFactory(
	'SliderThumbContainer',
	{
		classNames: 'mdc-slider__thumb-container'
	}
);

export const SliderPin = simpleComponentFactory('SliderPin', {
	classNames: 'mdc-slider__pin'
});

export const SliderPinValueMarker = simpleComponentFactory(
	'SliderPinValueMarker',
	{
		tag: 'span',
		classNames: 'mdc-slider__pin-value-marker'
	}
);

export const SliderThumb = props => (
	<svg className="mdc-slider__thumb" width="21" height="21">
		<circle cx="10.5" cy="10.5" r="7.875" />
	</svg>
);

export const SliderFocusRing = simpleComponentFactory('SliderFocusRing', {
	classNames: 'mdc-slider__focus-ring'
});

export class Slider extends MDCComponentBase {
	static MDCComponentClass = MDCSlider;

	static propTypes = {
		onChange: PropTypes.func,
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		discrete: PropTypes.bool,
		displayMarkers: PropTypes.bool,
		disabled: PropTypes.bool,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		onChange: noop,
		value: 0,
		min: 0,
		max: 100,
		step: undefined,
		discrete: false,
		displayMarkers: false,
		disabled: false,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		onChange: {
			type: 'Function',
			desc:
				"A callback that takes an event with event.target.value set to the Slider's value."
		},
		value: {
			type: 'Number',
			desc: 'The value of the Slider.'
		},
		min: {
			type: 'Number',
			desc: 'The minimum value of the Slider.'
		},
		max: {
			type: 'Number',
			desc: 'The maximum value of the Slider'
		},
		step: {
			type: 'Number',
			desc: 'A step to quantize values by.'
		},
		discrete: {
			type: 'Boolean',
			desc: 'Displays the exact value of the Slider on the knob.'
		},
		displayMarkers: {
			type: 'Boolean',
			desc: 'Displays the individual step markers on the Slider track.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the control.'
		},
		...MDCComponentBase.propMeta
	});

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCSlider:input', evt => {
			evt.target.value = this.MDCApi.value;
			this.props.onChange(evt);
		});

		this.MDCRegisterListener('MDCSlider:change', evt => {
			evt.target.value = this.MDCApi.value;
			this.props.onChange(evt);
		});
	}

	MDCHandleProps(props) {
		if (this.MDCApi.value !== props.value) {
			this.MDCApi.value = props.value;
			this.props.onChange({ target: { value: this.MDCApi.value } });
		}

		['min', 'max', 'step', 'disabled'].forEach(
			key => (this.MDCApi[key] = props[key])
		);
	}

	render() {
		const {
			value,
			min,
			max,
			discrete,
			displayMarkers,
			apiRef,
			step,
			onChange,
			className,
			disabled,
			...rest
		} = this.props;

		if (displayMarkers && !discrete) {
			console.warn(
				`The 'displayMarkers' prop on rmwc Slider will only work in conjunction with the 'discrete' prop`
			);
		}

		const classes = classNames(className, {
			'mdc-slider--discrete': discrete,
			'mdc-slider--display-markers': displayMarkers && discrete
		});

		const dataStep = step ? { 'data-step': step } : {};

		return (
			<SliderRoot
				elementRef={el => this.MDCSetRootElement(el)}
				className={classes}
				tabIndex="0"
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-label="Select Value"
				{...(disabled ? { 'aria-disabled': disabled } : {})}
				{...dataStep}
				{...rest}
			>
				<SliderTrackContainer>
					<SliderTrack />
					{displayMarkers && <SliderTrackMarkerContainer />}
				</SliderTrackContainer>
				<SliderThumbContainer>
					{discrete && (
						<SliderPin>
							<SliderPinValueMarker />
						</SliderPin>
					)}
					<SliderThumb />
					<SliderFocusRing />
				</SliderThumbContainer>
			</SliderRoot>
		);
	}
}

export default Slider;
