import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select';
import classNames from 'classnames';
import MDCComponentBase from '../_base/mdc-component-base';

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

		const classes = classNames('mdc-select', className);

		return (
			<div ref={el => (this.el = el)} className={classes} role="listbox" tabIndex="0" {...rest}>
				<span className="mdc-select__selected-text">{ displayValue }</span>
				{!!label.length &&
					<div style={{position: 'absolute', marginTop: '34px', whiteSpace: 'nowrap'}}>
						<label className="mdc-textfield__label mdc-textfield__label--float-above">
							{label}
						</label>
					</div>
				}
				<div className="mdc-simple-menu mdc-select__menu">
					<ul className="mdc-list mdc-simple-menu__items">
						{!!placeholder.length &&
							<li className="mdc-list-item" role="option" id="placeholder" aria-disabled="true">
								{ placeholder }
							</li>
						}
						{options &&
							Array.from(selectOptions).map(([optionLabel, optionVal], i) => (
								<li
									key={i}
									className="mdc-list-item"
									role="option"
									id={optionVal}
									tabIndex="0"
								>
									{optionLabel}
								</li>
							))
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default Select;