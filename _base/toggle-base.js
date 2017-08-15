import React from 'react';
import PropTypes from 'prop-types';

export class ToggleBase extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		api: PropTypes.func,
		disabled: PropTypes.bool,
		checked: PropTypes.bool,
		label: PropTypes.string
	}

	static defaultProps = {
		label: '',
		disabled: false,
		checked: false
	}

	constructor(props) {
		super(props);
		this.generatedId = Date.now() + Math.random() + '';
	}

	componentDidMount() {
		if (this.constructor.ComponentConstructor) {
			this.api = new this.constructor.ComponentConstructor(this.el);
			this.props.api && this.props.api(this.api);
		}
	}

	componentWillMount() {
		this.el = null;
	}
}

export default ToggleBase;