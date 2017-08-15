import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextfield } from '@material/textfield';
import classNames from 'classnames';

export class Textfield extends React.Component {
	static propTypes = {
		inputRef: PropTypes.func,
		disabled: PropTypes.bool,
		label: PropTypes.string,
		rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	}

	static defaultProps = {
		inputRef: () => {},
		disabled: false,
		label: ''
	}

	componentDidMount() {
		this.api = new MDCTextfield(this.el);
		this.props.api && this.props.api(this.api);
	}

	componentWillUpdate(nextProps) {

	}

	componentDidUpdate() {

	}

	render() {
		const {
			label,
			className,
			inputRef,
			...rest
		} = this.props;

		const classes = classNames(
			'mdc-textfield',
			className,
			{
				'mdc-textfield--multiline': this.props.rows || this.props.cols
			}
		);

		const tagProps = {
			type: 'text',
			className: 'mdc-textfield__input',
			ref: inputRef,
			...rest
		}

		const tag = this.props.rows || this.props.cols
			? <textarea {...tagProps} />
			: <input {...tagProps} />;

		return (
			<label className={classes} ref={ref => (this.el = ref)}>
				{tag}
				<span className="mdc-textfield__label">{ label }</span>
			</label>
		);
	}
}

export default Textfield;