import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextfield } from '@material/textfield/dist/mdc.textfield';
import classNames from 'classnames';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import simpleComponentFactory from '../Base/simple-component-factory';

export const TextfieldRoot = simpleComponentFactory('TextfieldRoot', {
	tag: 'label',
	classNames: props => [
		'mdc-textfield',
		{ 'mdc-textfield--textarea': props.textarea }
	],
	consumeProps: ['textarea']
});

export const TextfieldLabel = simpleComponentFactory('TextfieldLabel', {
	tag: 'span',
	classNames: props => [
		'mdc-textfield__label',
		{
			'mdc-textfield__label--float-above': props.value
		}
	],
	consumeProps: ['value']
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
		inputRef: PropTypes.func,
		disabled: PropTypes.bool,
		label: PropTypes.any,
		textarea: PropTypes.bool,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		inputRef: noop,
		disabled: false,
		label: undefined,
		textarea: undefined,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		inputRef: {
			type: 'Function',
			desc: 'A ref for the native input.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the input.'
		},
		label: {
			type: 'Any',
			desc: 'A label for the input.'
		},
		textarea: {
			type: 'Boolean',
			desc: 'Creates a multiline textfield'
		},
		...MDCComponentBase.propMeta
	});

	componentDidUpdate(prevProps) {
		if (prevProps.textarea !== this.props.textarea) {
			this.MDCComponentReinit();
		}
	}

	render() {
		const {
			label = '',
			className,
			inputRef,
			apiRef,
			children,
			textarea,
			...rest
		} = this.props;

		const tagProps = {
			elementRef: inputRef,
			...rest
		};

		const tag = textarea ? (
			<TextfieldTextarea {...tagProps} />
		) : (
			<TextfieldInput {...tagProps} />
		);

		return (
			<TextfieldRoot
				className={className}
				textarea={textarea}
				elementRef={el => this.MDCSetRootElement(el)}
			>
				{children}
				{tag}
				<TextfieldLabel value={this.props.value}>{label}</TextfieldLabel>
			</TextfieldRoot>
		);
	}
}

export default Textfield;
