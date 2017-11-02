import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { propMeta } from './prop-meta';
import { noop } from './noop';

export class MDCComponentBase extends React.Component {
  static MDCComponentClass = undefined;

  static propTypes = {
    apiRef: PropTypes.func
  };

  static defaultProps = {
    apiRef: noop
  };

  static propMeta = propMeta({
    apiRef: {
      type: 'Function',
      desc:
        'A callback that receives the MDC api instance as its only argument.'
    }
  });

  MDCListeners = [];
  MDCRootElement = undefined;

  componentDidMount() {
    this.MDCComponentInit(this.props);
  }

  componentWillUpdate(nextProps) {
    this.MDCHandleProps(nextProps);
  }

  componentWillUnmount() {
    this.MDCComponentDestroy();
  }

  MDCComponentInit() {
    if (this.constructor.MDCComponentClass) {
      const el = this.MDCGetRootElement();

      // a stupid hack for the test environment where this ends up undefined
      if (process.env.NODE_ENV === 'test') {
        el.dataset = {};
      }

      this.MDCApi = new this.constructor.MDCComponentClass(el);
      this.props.apiRef(this.MDCApi);
    }
    this.MDCComponentDidMount();
    this.MDCHandleProps(this.props, true);
  }

  MDCComponentReinit() {
    this.MDCComponentDestroy();
    this.MDCComponentInit();
  }

  MDCComponentDestroy() {
    this.MDCUnregisterAllListeners();
    this.MDCApi && this.MDCApi.destroy();
  }

  MDCRegisterListener(eventName, func) {
    this.MDCApi.listen(eventName, func);
    this.MDCListeners.push(() => this.MDCApi.unlisten(eventName, func));
  }

  MDCUnregisterAllListeners() {
    this.MDCListeners.forEach(unlisten => unlisten());
    this.MDCListeners.length = 0;
  }

  MDCSetRootElement(el) {
    this.MDCRootElement = el;
  }

  MDCGetRootElement() {
    return this.MDCRootElement || ReactDOM.findDOMNode(this);
  }

  MDCHandleProps(props, isInitialMount) {
    // Use this in the consumer to handle any api props that have changed
  }

  MDCComponentDidMount() {
    // Use this in the consumer to handle registering any listeners for MDC
  }
}

export default MDCComponentBase;
