import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCFormField } from '@material/form-field';

export class FormField extends React.Component {
	static propTypes = {
		apiRef: PropTypes.func
	}

	static defaultProps = {
		apiRef: () => {}
	}

	componentDidMount() {
		this.api = new MDCFormField(ReactDOM.findDOMNode(this));
		this.props.apiRef(this.api);
	}

	render() {
		const { className, children, apiRef, ...rest } = this.props;
		const classes = classNames(
			'mdc-form-field',
			className
		);
		return (
			<div className={classes} {...rest}>{children}</div>
		);
	}
}

export default FormField;