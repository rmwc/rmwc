import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCSimpleMenu } from '@material/menu';

export class Menu extends React.Component {
	static propTypes = {
		open: PropTypes.bool,
		onChange: PropTypes.func,
		onSelected: PropTypes.func,
	}

	static defaultProps = {
		onChange: () => {},
		onSelected: () => {}
	}

	componentDidMount() {
		this.api = new MDCSimpleMenu(this.el);
		this.props.api && this.props.api(this.api);

		this.api.listen('MDCSimpleMenu:cancel', (evt) => this.handleOnChange(evt));
		this.api.listen('MDCSimpleMenu:selected', (evt) => {
			this.handleOnChange(evt);
			this.props.onSelected(evt)
		});
	}

	componentWillUpdate(nextProps) {
		if (nextProps.open !== undefined && this.api.open !== nextProps.open) {
			this.api.open = nextProps.open;
		}
	}

	componentWillUnmount() {
		this.el = null;
	}

	handleOnChange(evt) {
		window.requestAnimationFrame(() => {
			evt.target.value = this.api.foundation_.isOpen();
			this.props.onChange(evt);
		});
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
				<ul className="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
					{children}
				</ul>
			</div>
		);
	}
}

export default Menu;