import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCSlider } from '@material/slider';
import MDCComponentBase from '../_base/mdc-component-base';

import simpleComponentFactory from '../_base/simple-component-factory';

export const SliderEl = simpleComponentFactory(
	'SliderEl', 'div',
	{className: 'mdc-slider'}
);

export const SliderTrackContainerEl = simpleComponentFactory(
	'SliderTrackContainerEl', 'div',
	{className: 'mdc-slider__track-container'}
);

export const SliderTrackEl = simpleComponentFactory(
	'SliderTrackEl', 'div',
	{className: 'mdc-slider__track'}
);

export const SliderTrackMarkerContainerEl = simpleComponentFactory(
	'SliderTrackMarkerContainerEl', 'div',
	{className: 'mdc-slider__track-marker-container'}
);

export const SliderThumbContainerEl = simpleComponentFactory(
	'SliderThumbContainerEl', 'div',
	{className: 'mdc-slider__thumb-container'}
);

export const SliderPinEl = simpleComponentFactory(
	'SliderPinEl', 'div',
	{className: 'mdc-slider__pin'}
);

export const SliderPinValueMarkerEl = simpleComponentFactory(
	'SliderPinValueMarkerEl', 'span',
	{className: 'mdc-slider__pin-value-marker'}
);

export const SliderThumbEl = props => (
	<svg className="mdc-slider__thumb" width="21" height="21">
		<circle cx="10.5" cy="10.5" r="7.875"></circle>
	</svg>
);

export const SliderFocusRingEl = simpleComponentFactory(
	'SliderFocusRingEl', 'div',
	{className: 'mdc-slider__focus-ring'}
);

export class Slider extends MDCComponentBase {
	static MDCComponentClass = MDCSlider;

	static propTypes = {
		...MDCComponentBase.propTypes,
		onChange: PropTypes.func,
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		discrete: PropTypes.bool,
		displayMarkers: PropTypes.bool,
		step: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		onChange: () => {},
		value: 0,
		min: 0,
		max: 100,
		discrete: false,
		displayMarkers: false
	}

	MDCComponentDidMount() {
		this.api = new MDCSlider(ReactDOM.findDOMNode(this));
		this.MDCRegisterListener('MDCSlider:change', evt => {
			evt.target.value = this.MDCApi.value;
			this.props.onChange(evt);
		});
	}

	MDCHandleProps(props) {
		if (this.MDCApi.value !== props.value) {
			this.MDCApi.value = props.value;
			this.props.onChange({target: {value: this.MDCApi.value}});
		}
		this.MDCApi.min = props.min;
		this.MDCApi.max = props.max;
	}

	render() {
		const {value, min, max, discrete, displayMarkers, apiRef, step, onChange, className, ...rest} = this.props;

		if (displayMarkers && !discrete) {
			console.warn(`The 'displayMarkers' prop on RMDC Slider will only work in conjunction with the 'discrete' prop`);
		}

		const classes = classNames(
			className,
			{
				'mdc-slider--discrete': discrete,
				'mdc-slider--display-markers': displayMarkers && discrete
			}
		);

		const dataStep = step ? {'data-step': step} : {};

		return (
			<SliderEl
				className={classes}
				tabIndex="0"
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-label="Select Value"
				{ ...dataStep }
				{ ...rest }
			>
				<SliderTrackContainerEl>
					<SliderTrackEl/>
					{displayMarkers &&
						<SliderTrackMarkerContainerEl/>
					}
				</SliderTrackContainerEl>
				<SliderThumbContainerEl>
					{discrete &&
						<SliderPinEl>
							<SliderPinValueMarkerEl/>
						</SliderPinEl>
					}
					<SliderThumbEl/>
					<SliderFocusRingEl/>
				</SliderThumbContainerEl>
			</SliderEl>
		);
	}
}

export default Slider;
