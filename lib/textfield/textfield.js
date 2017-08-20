import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextfield } from '@material/textfield';
import classNames from 'classnames';
import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

export const TextfieldRoot = simpleComponentFactory('TextfieldRoot', {
	tag: 'label',
	classNames: 'mdc-textfield'
});

export const TextfieldLabel = simpleComponentFactory('TextfieldLabel', {
	tag: 'span',
	classNames: 'mdc-textfield__label'
});

export const TextfieldInput = simpleComponentFactory('TextfieldInput', {
	tag: 'input',
	classNames: 'mdc-textfield__input',
	defaultProps: {
		type: 'text'
	}
});

export const TextfieldTextarea = simpleComponentFactory('TextfieldTextarea', {
	tag: 'textarea',
	classNames: 'mdc-textfield__input'
});

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
			? <TextfieldTextarea {...tagProps} />
			: <TextfieldInput {...tagProps} />;

		return (
			<TextfieldRoot elementRef={el => this.MDCSetRootElement(el)} className={classes}>
				{tag}
				<TextfieldLabel>{ label }</TextfieldLabel>
			</TextfieldRoot>
		);
	}
}

export default Textfield;