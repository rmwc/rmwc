import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCSlider } from '@material/slider';

import MDCComponentBase from '../_base/mdc-component-base';

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
			'mdc-slider',
			className,
			{
				'mdc-slider--discrete': discrete,
				'mdc-slider--display-markers': displayMarkers && discrete
			}
		);

		const dataStep = step ? {'data-step': step} : {};

		return (
			<div
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
				<div className="mdc-slider__track-container">
					<div className="mdc-slider__track"></div>
					{displayMarkers &&
						<div className="mdc-slider__track-marker-container"></div>
					}
				</div>
				<div className="mdc-slider__thumb-container">
					{discrete &&
						<div className="mdc-slider__pin">
							<span className="mdc-slider__pin-value-marker"></span>
						</div>
					}
					<svg className="mdc-slider__thumb" width="21" height="21">
						<circle cx="10.5" cy="10.5" r="7.875"></circle>
					</svg>
					<div className="mdc-slider__focus-ring"></div>
				</div>
			</div>
		);
	}
}

export default Slider;
