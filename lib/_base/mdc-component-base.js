import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class MDCComponentBase extends React.Component {
	static MDCComponentClass = undefined;

	static propTypes = {
		apiRef: PropTypes.func
	}

	static defaultProps = {
		apiRef: () => {}
	}

	componentDidMount() {
		this.MDCComponentInit();
	}

	componentWillReceiveProps(nextProps) {
		this.MDCHandleProps(nextProps);
	}

	componentWillUnmount() {
		this.MDCListeners.forEach(unlisten => unlisten());
	}

	MDCComponentInit() {
		this.MDCListeners = [];
		this.MDCApi = new this.constructor.MDCComponentClass(ReactDOM.findDOMNode(this));
		this.props.apiRef(this.MDCApi);
		this.MDCComponentDidMount();
		this.MDCHandleProps(this.props);
	}

	MDCRegisterListener(eventName, func) {
		this.MDCApi.listen(eventName, func);
		this.MDCListeners.push(() => this.MDCApi.unlisten(eventName, func));
	}

	MDCHandleProps(props) {
		// Use this in the consumer to handle any api props that have changed
	}

	MDCComponentDidMount() {
		// Use this in the consumer to handle registering any listeners for MDC
	}
}

export default MDCComponentBase;