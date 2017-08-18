import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select';
import MDCComponentBase from '../_base/mdc-component-base';
import ListItem from '../list/list-item';
import List from '../list/list';

import simpleComponentFactory from '../_base/simple-component-factory';

export const SelectEl = simpleComponentFactory(
	'SelectEl', 'div',
	{
		className: 'mdc-select',
		role: 'listbox',
		tabIndex: '0'
	}
);

export const SelectSelectedTextEl = simpleComponentFactory(
	'SelectSelectedTextEl', 'span',
	{className: 'mdc-select__selected-text'}
);

export const SelectLabelEl = props => (
	<div style={{position: 'absolute', marginTop: '34px', whiteSpace: 'nowrap'}}>
		<label className="mdc-textfield__label mdc-textfield__label--float-above">
			{props.children}
		</label>
	</div>
);

export const SelectMenuEl = simpleComponentFactory(
	'SelectMenuEl', 'div',
	{className: 'mdc-simple-menu mdc-select__menu'}
);

export class Select extends MDCComponentBase {
	static MDCComponentClass = MDCSelect;

	static propTypes = {
		...MDCComponentBase.propTypes,
		placeholder: PropTypes.string,
		options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		disabled: PropTypes.bool,
		label: PropTypes.string
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		placeholder: '',
		label: '',
		disabled: false
	}

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCSelect:change', evt => {
			evt.target.value = this.MDCApi.value;
			this.props.onChange && this.props.onChange(evt);
		});
		window.requestAnimationFrame(() => this.MDCApi.foundation_.resize());
	}

	MDCHandleProps(props) {
		if (this.props.value !== props.value) {
			this.MDCApi.selectedIndex = this.MDCApi.nameditem(props.value);
		}
	}

	componentDidUpdate() {
		this.MDCApi.foundation_.resize();
	}

	render() {
		const { placeholder, value, label, options, className, apiRef, ...rest } = this.props;
		const displayValue = options && options[value] !== undefined
			? options[value]
			: value || placeholder;

		const selectOptions = Array.isArray(options)
			? new Map(options.map(val => [val, val]))
			: new Map(Object.entries(options).map(([val, label]) => [label, val]));

		return (
			<SelectEl {...rest}>
				<SelectSelectedTextEl>{ displayValue }</SelectSelectedTextEl>
				{!!label.length &&
					<SelectLabelEl>{label}</SelectLabelEl>
				}
				<SelectMenuEl>
					<List className="mdc-simple-menu__items">
						{!!placeholder.length &&
							<ListItem
								role="option"
								id="placeholder"
								aria-disabled="true"
							>
								{ placeholder }
							</ListItem>
						}
						{options &&
							Array.from(selectOptions).map(([optionLabel, optionVal], i) => (
								<ListItem
									key={i}
									role="option"
									id={optionVal}
									tabIndex="0"
								>
									{optionLabel}
								</ListItem>
							))
						}
					</List>
				</SelectMenuEl>
			</SelectEl>
		);
	}
}

export default Select;