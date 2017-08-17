import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class ToggleBase extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		apiRef: PropTypes.func,
		disabled: PropTypes.bool,
		checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		label: PropTypes.string
	}

	static defaultProps = {
		label: '',
		disabled: false
	}

	constructor(props) {
		super(props);
		this.generatedId = Date.now() + Math.random() + '';
	}

	componentDidMount() {
		if (this.constructor.ComponentConstructor) {
			this.api = new this.constructor.ComponentConstructor(this.el);
			this.props.apiRef && this.props.apiRef(this.api);
		}
	}

	componentWillMount() {
		this.el = null;
	}
}

export default ToggleBase;