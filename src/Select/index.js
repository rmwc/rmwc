import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select/dist/mdc.select';
import MDCComponentBase from '../Base/mdc-component-base';
import { propMeta } from '../Base/prop-meta';
import { List, ListItem } from '../List';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export const SelectRoot = simpleComponentFactory('SelectRoot', {
	classNames: 'mdc-select',
	defaultProps: {
		role: 'listbox',
		tabIndex: '0'
	}
});

export const SelectSelectedText = simpleComponentFactory('SelectSelectedText', {
	tag: 'span',
	classNames: 'mdc-select__selected-text'
});

export const SelectLabel = props => (
	<div
		style={{ position: 'absolute', marginTop: '34px', whiteSpace: 'nowrap' }}
	>
		<label className="mdc-textfield__label mdc-textfield__label--float-above">
			{props.children}
		</label>
	</div>
);

export const SelectMenu = simpleComponentFactory('SelectMenu', {
	classNames: 'mdc-simple-menu mdc-select__menu'
});

export const SelectFormField = simpleComponentFactory('SelectMenu', {
	classNames: 'rmwc-select-form-field',
	defaultProps: {
		style: {
			height: '48px',
			marginTop: '16px',
			marginBottom: '8px',
			display: 'inline-flex',
			alignItems: 'flex-end'
		}
	}
});

export class Select extends MDCComponentBase {
	static MDCComponentClass = MDCSelect;

	static propTypes = {
		options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		label: PropTypes.string,
		placeholder: PropTypes.string,
		disabled: PropTypes.bool,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		options: undefined,
		label: undefined,
		placeholder: undefined,
		disabled: false,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		placeholder: {
			type: 'String',
			desc: 'Placeholder text for the form control.'
		},
		options: {
			type: ['Array', 'Object'],
			desc:
				'An array of values or a map of {value: "label"}. Arrays will be converted to a map of {value: value}.'
		},
		label: {
			type: 'String',
			desc: 'A label for the form control.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the form control.'
		},
		...MDCComponentBase.propMeta
	});

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCSelect:change', evt => {
			evt.target.value = this.MDCApi.value;
			this.props.onChange && this.props.onChange(evt);
		});
		window.requestAnimationFrame(() => this.MDCApi.foundation_.resize());
	}

	MDCHandleProps(nextProps, initialMount) {
		if (this.props.value !== nextProps.value || initialMount) {
			const newIndex = this.MDCApi.options.indexOf(
				this.MDCApi.nameditem(nextProps.value)
			);
			this.MDCApi.selectedIndex =
				newIndex == -1 && this.props.placeholder ? 0 : newIndex;
		}
	}

	componentDidUpdate(prevProps) {
		this.MDCApi.foundation_.resize();
	}

	getDisplayValue(value, options, placeholder) {
		placeholder = placeholder || '\u00a0';

		if (options) {
			return options.get(value) !== undefined
				? options.get(value)
				: placeholder;
		}

		return value || placeholder;
	}

	render() {
		const {
			placeholder = '',
			value,
			label = '',
			options,
			apiRef,
			...rest
		} = this.props;

		const selectOptions = Array.isArray(options)
			? new Map(options.map(val => [val, val]))
			: new Map(Object.entries(options).map(([val, label]) => [label, val]));

		const displayValue = this.getDisplayValue(
			value,
			selectOptions,
			placeholder
		);

		return (
			<SelectRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}>
				<SelectSelectedText>{displayValue}</SelectSelectedText>
				{!!label.length && <SelectLabel>{label}</SelectLabel>}
				<SelectMenu>
					<List className="mdc-simple-menu__items">
						{!!placeholder.length && (
							<ListItem role="option" id="placeholder" aria-disabled="true">
								{placeholder}
							</ListItem>
						)}
						{options &&
							Array.from(selectOptions).map(([optionLabel, optionVal], i) => (
								<ListItem key={i} role="option" id={optionVal} tabIndex="0">
									{optionLabel}
								</ListItem>
							))}
					</List>
				</SelectMenu>
			</SelectRoot>
		);
	}
}

export default Select;
