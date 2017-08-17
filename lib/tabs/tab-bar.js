import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCTabBar } from '@material/tabs';
import simpleComponentFactory from '../_base/simple-component-factory';

const TabBarRenderer = simpleComponentFactory('TabBarRenderer', 'nav', {className: 'mdc-tab-bar'});

export class TabBar extends React.Component {
	static propTypes = {
		apiRef: PropTypes.func,
		activeTabIndex: PropTypes.number,
		onChange: PropTypes.func
	}

	static defaultProps = {
		apiRef: () => {},
		onChange: () => {},
		activeTabIndex: 0
	}

	handlers = [];

	componentDidMount() {
		this.api = new MDCTabBar(ReactDOM.findDOMNode(this));
		this.registerHandler('MDCTabBar:change', evt => {
			evt.target.value = this.api.activeTabIndex;
			this.props.onChange(evt);
		});

		this.api.activeTabIndex = this.props.activeTabIndex;
		this.props.apiRef(this.api);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.activeTabIndex !== this.props.activeTabIndex) {
			this.api.activeTabIndex = nextProps.activeTabIndex;
		}
	}

	componentWillUnmount() {
		this.handlers.forEach(func => func());
	}

	registerHandler(eventName, func) {
		this.api.listen(eventName, func);
		this.handlers.push(() => this.api.unlisten(eventName, func));
	}

	render() {
		const {apiRef, activeTabIndex, children, ...rest} = this.props;
		return (
			<TabBarRenderer { ...rest }>
				{ children }
				<span className="mdc-tab-bar__indicator"></span>
			</TabBarRenderer>
		);
	}
}

export default TabBar;