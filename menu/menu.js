import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCSimpleMenu } from '@material/menu';

export class Menu extends React.Component {
	static propTypes = {
		open: PropTypes.bool,
		onChange: PropTypes.func,
		onSelected: PropTypes.func
	}

	static defaultProps = {
		onChange: () => {},
		onSelected: () => {}
	}

	handlers = [];

	componentDidMount() {
		this.api = new MDCSimpleMenu(this.el);
		this.props.api && this.props.api(this.api);

		this.registerHandler('MDCSimpleMenu:cancel', (evt) => this.handleOnChange(evt));
		this.registerHandler('MDCSimpleMenu:selected', (evt) => {
			this.handleOnChange(evt);
			this.props.onSelected(evt);
		});
	}

	componentWillUpdate(nextProps) {
		if (nextProps.open !== undefined && this.api.open !== nextProps.open) {
			this.api.open = nextProps.open;
		}
	}

	componentWillUnmount() {
		this.el = null;
		this.handlers.forEach(handler => handler());
	}

	registerHandler(eventName, handler) {
		this.api.listen(eventName, handler);
		this.handlers.push(() => this.api.unlisten(eventName, handler));
	}

	handleOnChange(evt) {
		evt.target.value = false;
		this.props.onChange(evt);
	}

	render() {
		const {
			className,
			children,
			open,
			onChange,
			onSelected,
			...rest } = this.props;

		const classes = classNames(
			'mdc-simple-menu',
			className
		);

		return (
			<div ref={el => (this.el = el)} className={classes} tabIndex="-1" {...rest}>
				<div className="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
					{children}
				</div>
			</div>
		);
	}
}

export default Menu;