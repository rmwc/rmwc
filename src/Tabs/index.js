import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCTabBar } from '@material/tabs/dist/mdc.tabs';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import simpleComponentFactory from '../Base/simple-component-factory';

export const Tab = simpleComponentFactory('Tab', { classNames: 'mdc-tab' });

export const TabBarRoot = simpleComponentFactory('TabBarRoot', {
	tag: 'nav',
	classNames: 'mdc-tab-bar'
});

export const TabBarIndicatorEl = simpleComponentFactory('TabBarIndicatorEl', {
	tag: 'span',
	classNames: 'mdc-tab-bar__indicator'
});

export class TabBar extends MDCComponentBase {
	static MDCComponentClass = MDCTabBar;

	static propTypes = {
		onChange: PropTypes.func,
		activeTabIndex: PropTypes.number,
		...MDCComponentBase.propTypes,
		...TabBarRoot.propTypes
	};

	static defaultProps = {
		onChange: noop,
		activeTabIndex: 0,
		...TabBarRoot.defaultProps,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		onChange: {
			type: 'Function',
			desc:
				'Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex'
		},
		activeTabIndex: {
			type: 'Integer',
			desc: 'The index of the active tab'
		},
		...TabBarRoot.propMeta,
		...MDCComponentBase.propMeta
	});

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
		const { apiRef, activeTabIndex, children, ...rest } = this.props;
		return (
			<TabBarRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}>
				{children}
				<TabBarIndicatorEl />
			</TabBarRoot>
		);
	}
}

export default TabBar;
