import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCTabBar } from '@material/tabs';
import simpleComponentFactory from '../_base/simple-component-factory';
import MDCComponentBase from '../_base/mdc-component-base';

const TabBarBase = simpleComponentFactory('TabBarBase', 'nav', {className: 'mdc-tab-bar'});

export class TabBar extends MDCComponentBase {
	static MDCComponentClass = MDCTabBar;

	static propTypes = {
		...TabBarBase.propTypes,
		...MDCComponentBase.propTypes,
		onChange: PropTypes.func,
		activeTabIndex: PropTypes.number
	}

	static defaultProps = {
		...TabBarBase.defaultProps,
		...MDCComponentBase.defaultProps,
		onChange: () => {},
		activeTabIndex: 0
	}

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCTabBar:change', evt => {
			evt.target.value = this.api.activeTabIndex;
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
		return (
			<TabBarBase { ...rest }>
				{ children }
				<span className="mdc-tab-bar__indicator"></span>
			</TabBarBase>
		);
	}
}

export default TabBar;