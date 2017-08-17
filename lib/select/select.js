import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select';
import classNames from 'classnames';

export class Select extends React.Component {
	static propTypes = {
		placeholder: PropTypes.string,
		options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		disabled: PropTypes.bool,
		label: PropTypes.string
	}

	static defaultProps = {
		placeholder: '',
		label: '',
		disabled: false
	}

	componentDidMount() {
		this.api = new MDCSelect(this.el);
		this.props.api && this.props.api(this.api);
		this.api.listen('MDCSelect:change', (evt) => this.handleChange(evt));
		window.requestAnimationFrame(() => this.api.foundation_.resize());
	}

	componentWillUpdate(nextProps) {
		if (this.props.value !== nextProps.value) {
			this.api.selectedIndex = this.api.nameditem(nextProps.value);
		}
	}

	componentDidUpdate() {
		this.api.foundation_.resize();
	}

	handleChange(evt) {
		evt.target.value = this.api.value;
		this.props.onChange && this.props.onChange(evt);
	}

	render() {
		const { placeholder, value, label, options, className, ...rest } = this.props;
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