// @flow
import * as React from 'react';
import classNames from 'classnames';
import { eventsMap } from './utils/events-map';

const reactPropFromEventName = (evtName: string) => eventsMap[evtName];

type ClassListT = {
  renderToString: () => string,
  add: (className: string) => void,
  has: (className: string) => boolean,
  remove: (className: string) => void
};

type PropsListT = {
  addEventListener: (evtName: string, callback: Function) => void,
  removeEventListener: (evtName: string, callback: Function) => void,
  all: () => { [key: string]: any },
  get: (propName: string) => any,
  add: (propName: string, value: any) => void,
  remove: (propName: string) => void
};

type FoundationPropsT<P> = P &
  //$FlowFixMe
  React.HTMLAttributes<any> &
  //$FlowFixMe
  React.HTMLProps<any>;

export class FoundationComponent<P> extends React.Component<
  FoundationPropsT<P>
> {
  foundation_: any;
  classList: { [key: string]: ClassListT } = {};
  propsList: { [key: string]: PropsListT } = {};

  constructor(props: FoundationPropsT<P>) {
    super(props);
    this.foundation_ = this.getDefaultFoundation();
  }

  createClassList(elementName: string) {
    const classes = new Set();
    this.classList[elementName] = {
      renderToString: () =>
        classNames(elementName === 'root_' && this.props.className, [
          ...classes
        ]),
      has: className => {
        return classes.has(className);
      },
      add: className => {
        if (!classes.has(className)) {
          classes.add(className);
          this.setState({});
        }
      },
      remove: className => {
        if (classes.has(className)) {
          classes.delete(className);
          this.setState({});
        }
      }
    };
  }

  createPropsList(elementName: string) {
    let props = {};

    const add = (propName, value) => {
      props = {
        ...props,
        [propName]: value
      };
      this.setState({});
    };

    const remove = propName => {
      delete props[propName];
      props = {
        ...props
      };
      this.setState({});
    };

    this.propsList[elementName] = {
      addEventListener: (evtName, callback) => {
        add(reactPropFromEventName(evtName), callback);
      },
      removeEventListener: (evtName, callback) => {
        remove(reactPropFromEventName(evtName));
      },
      all: () => props,
      add,
      remove,
      get: (attr: string) => props[attr]
    };
  }

  componentDidMount() {
    this.foundation_.init();
    this.syncWithDOM(this.props);
  }

  componentDidUpdate() {
    this.syncWithDOM(this.props);
  }

  componentWillUnmount() {
    this.foundation_ && this.foundation_.destroy();
    this.propsList = {};
    this.classList = {};
  }

  syncWithDOM(props: any) {}

  getDefaultFoundation() {}

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   */
  emit(evtType: string, evtData: Object, shouldBubble: boolean = false) {
    let evt;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    // Custom handling for React
    const propName = evtType;

    // check to see if the foundation still exists. If not, we are
    // probably unmounted or destroyed and dont want to call any more handlers
    // This happens when MDC broadcasts certain events on timers
    if (this.foundation_) {
      if (this.props[propName]) {
        // covers calling variations of events. onOpened, onClosed -> onOpen, onClose
        this.props[propName](evt);
      }
    }

    return evt;
  }
}
