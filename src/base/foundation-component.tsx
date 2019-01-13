import * as React from 'react';
import classNames from 'classnames';
import { eventsMap } from './utils/events-map';

const reactPropFromEventName = (evtName: string) =>
  (eventsMap as { [key: string]: string })[evtName];

type ClassListT = {
  renderToString: () => string;
  add: (className: string) => void;
  has: (className: string) => boolean;
  remove: (className: string) => void;
};

class PropsList {
  update: Function;
  props: { [key: string]: any } = {};

  constructor(update: () => void) {
    this.update = update;
  }

  add(propName: string, value: any) {
    this.props = {
      ...this.props,
      [propName]: value
    };
    this.update();
  }

  remove(propName: string) {
    delete this.props[propName];
    this.props = {
      ...this.props
    };
    this.update();
  }

  all(mergeProps?: Object) {
    if (mergeProps) {
      const merged = Object.entries(mergeProps).reduce(
        (acc: any, [key, val]) => {
          if (
            typeof this.props[key] === 'function' &&
            typeof val === 'function'
          ) {
            const oldFunc = this.props[key];
            const wrappedFunc = (evt: any) => {
              oldFunc(evt);
              val(evt);
            };

            acc[key] = wrappedFunc;
          }
          return acc;
        },
        {}
      );

      return {
        ...mergeProps,
        ...this.props,
        ...merged
      };
    }

    return this.props;
  }

  get(attr: string) {
    return this.props[attr];
  }

  addEventListener(evtName: string, callback: () => void) {
    this.add(reactPropFromEventName(evtName), callback);
  }

  removeEventListener(evtName: string, callback: () => void) {
    this.remove(reactPropFromEventName(evtName));
  }
}

type FoundationPropsT<P> = P &
  //$FlowFixMe
  React.HTMLAttributes<any> &
  //$FlowFixMe
  React.HTMLProps<any>;

export class FoundationComponent<P, S = {}> extends React.Component<
  FoundationPropsT<P>,
  S
> {
  foundation_: any;
  classList: { [key: string]: ClassListT } = {};
  propsList: { [key: string]: PropsList } = {};

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
    this.propsList[elementName] = new PropsList(() => this.setState({}));
  }

  componentDidMount() {
    this.foundation_.init();
    this.sync(this.props);
  }

  componentDidUpdate(prevProps: FoundationPropsT<P>) {
    this.sync(this.props, prevProps);
  }

  componentWillUnmount() {
    this.foundation_ && this.foundation_.destroy();
    this.propsList = {};
    this.classList = {};
  }

  sync(props: any, prevProps?: any) {}

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

    // bugfix for events coming from form elements
    // and also fits with reacts form pattern better...
    // This should always otherwise be null since there is no target
    // for Custom Events
    Object.defineProperty(evt, 'target', {
      value: evtData,
      writable: false
    });

    // Custom handling for React
    const propName = evtType;

    // check to see if the foundation still exists. If not, we are
    // probably unmounted or destroyed and dont want to call any more handlers
    // This happens when MDC broadcasts certain events on timers
    if (this.foundation_) {
      //@ts-ignore
      if (this.props[propName]) {
        // covers calling variations of events. onOpened, onClosed -> onOpen, onClose
        //@ts-ignore
        this.props[propName](evt);
      }
    }

    return evt;
  }
}
