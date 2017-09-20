import React from 'react';
import PropTypes from 'prop-types';
import { textfield as mdcTextfield } from 'material-components-web';
import classNames from 'classnames';
import { propMeta } from '../_base/prop-meta';
import { noop } from '../_base/noop';
import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

const { MDCTextfield } = mdcTextfield;

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
		inputRef: PropTypes.func,
		disabled: PropTypes.bool,
		label: PropTypes.any,
		rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		...MDCComponentBase.propTypes
	}

	static defaultProps = {
		inputRef: noop,
		disabled: false,
		label: undefined,
		rows: undefined,
		cols: undefined,
		...MDCComponentBase.defaultProps
	}

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
		rows: {
			type: 'Number',
			desc: 'Creates a multiline textfield with the provided number of rows.'
		},
		cols: {
			type: 'Number',
			desc: 'Creates a multiline textfield with the provided number of cols.'
		},
		...MDCComponentBase.propMeta
	})

	render() {
		const {
			label = '',
			className,
			inputRef,
			apiRef,
			children,
			...rest
		} = this.props;

		const classes = classNames(
			className,
			{
				'mdc-textfield--multiline': this.props.rows || this.props.cols
			}
		);

		const tagProps = {
			elementRef: inputRef,
			...rest
		};

		const tag = this.props.rows || this.props.cols
			? <TextfieldTextarea {...tagProps} />
			: <TextfieldInput {...tagProps} />;

		return (
			<TextfieldRoot elementRef={el => this.MDCSetRootElement(el)} className={classes}>
				{children}
				{tag}
				<TextfieldLabel>{ label }</TextfieldLabel>
			</TextfieldRoot>
		);
	}
}

export default Textfield;