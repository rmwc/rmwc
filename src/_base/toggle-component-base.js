import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MDCComponentBase from './mdc-component-base';
import { propMeta } from './prop-meta';

export class ToggleBase extends MDCComponentBase {
	static propTypes = {
		id: PropTypes.string,
		disabled: PropTypes.bool,
		checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		indeterminate: PropTypes.bool,
		label: PropTypes.string,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		label: undefined,
		id: undefined,
		checked: undefined,
		indeterminate: undefined,
		disabled: false,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		label: {
			type: 'String',
			desc: 'A label for the form control.'
		},
		id: {
			type: 'String',
			desc:
				'A unique ID for the form control. One will be dynamically generated if not provided.'
		},
		checked: {
			type: 'Boolean',
			desc: 'Whether or not the form control is checked.'
		},
		indeterminate: {
			type: 'Boolean',
			desc:
				'(Checkbox only) puts the check in a half-checked state. Note, that this does not affect the checked property.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the form control.'
		},
		...MDCComponentBase.propMeta
	});

	constructor(props) {
		super(props);
		this.generatedId = Date.now() + Math.random() + '';
	}

	MDCHandleProps(nextProps) {
		if (this.MDCApi && nextProps.indeterminate !== this.MDCApi.indeterminate) {
			this.MDCApi.indeterminate = nextProps.indeterminate;
		}
	}
}

export default ToggleBase;
