import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MDCComponentBase from './mdc-component-base';

export class ToggleBase extends MDCComponentBase {
	static propTypes = {
		...MDCComponentBase.propTypes,
		id: PropTypes.string,
		apiRef: PropTypes.func,
		disabled: PropTypes.bool,
		checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		label: PropTypes.string
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		label: '',
		disabled: false
	}

	constructor(props) {
		super(props);
		this.generatedId = Date.now() + Math.random() + '';
	}

	componentWillUnmount() {
		this.toggleEl = null;
	}

	MDCGetRootElement() {
		return this.toggleEl;
	}
}

export default ToggleBase;