import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCTabBar } from '@material/tabs';
import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

export const TabBarEl = simpleComponentFactory(
	'TabBarEl', 'nav',
	{className: 'mdc-tab-bar'}
);

export const TabBarIndicatorEl = simpleComponentFactory(
	'TabBarIndicatorEl', 'span',
	{className: 'mdc-tab-bar__indicator'}
);

export class TabBarController extends MDCComponentBase {
	static MDCComponentClass = MDCTabBar;

	static propTypes = {
		...TabBarEl.propTypes,
		...MDCComponentBase.propTypes,
		onChange: PropTypes.func,
		activeTabIndex: PropTypes.number
	}

	static defaultProps = {
		...TabBarEl.defaultProps,
		...MDCComponentBase.defaultProps,
		onChange: () => {},
		activeTabIndex: 0
	}

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCTabBar:change', evt => {
			evt.target.value = this.MDCApi.activeTabIndex;
			this.props.onChange(evt);
		});
	}

	MDCHandleProps(props) {
		if (props.activeTabIndex !== this.props.activeTabIndex) {
			this.MDCApi.activeTabIndex = props.activeTabIndex;
		}
	}

	render() {
		const {apiRef, activeTabIndex, children, ...rest} = this.props;
		return React.cloneElement(children, {
			...children.props,
			...rest
		});
	}
}

export const TabBar = props => (
	<TabBarController { ...props}>
		<TabBarEl>
			{ props.children }
			<TabBarIndicatorEl/>
		</TabBarEl>
	</TabBarController>
);

export default TabBar;