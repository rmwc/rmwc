import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextfield } from '@material/textfield';
import classNames from 'classnames';
import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

export const TextfieldEl = simpleComponentFactory(
	'TextfieldEl', 'label',
	{className: 'mdc-textfield'}
);

export const TextfieldLabelEl = simpleComponentFactory(
	'TextfieldLabelEl', 'span',
	{className: 'mdc-textfield__label'}
);

export const TextfieldInputEl = simpleComponentFactory(
	'TextfieldInputEl', 'input',
	{
		className: 'mdc-textfield__input',
		type: 'text'
	}
);

export const TextfieldTextareaEl = simpleComponentFactory(
	'TextfieldTextareaEl', 'textarea',
	{className: 'mdc-textfield__input'}
);

export class Textfield extends MDCComponentBase {
	static MDCComponentClass = MDCTextfield;

	static propTypes = {
		...MDCComponentBase.propTypes,
		inputRef: PropTypes.func,
		disabled: PropTypes.bool,
		label: PropTypes.string,
		rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		inputRef: () => {},
		disabled: false,
		label: ''
	}

	render() {
		const {
			label,
			className,
			inputRef,
			apiRef,
			...rest
		} = this.props;

		const classes = classNames(
			className,
			{
				'mdc-textfield--multiline': this.props.rows || this.props.cols
			}
		);

		const tagProps = {
			ref: inputRef,
			...rest
		};

		const tag = this.props.rows || this.props.cols
			? <TextfieldTextareaEl {...tagProps} />
			: <TextfieldInputEl {...tagProps} />;

		return (
			<TextfieldEl className={classes}>
				{tag}
				<TextfieldLabelEl>{ label }</TextfieldLabelEl>
			</TextfieldEl>
		);
	}
}

export default Textfield;