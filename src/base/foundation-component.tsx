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
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.all = this.all.bind(this);
    this.get = this.get.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
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

  addEventListener(
    evtName: string,
    callback: (evt: Event) => void,
    shouldBubble?: boolean
  ) {
    this.add(reactPropFromEventName(evtName), callback);
  }

  removeEventListener(
    evtName: string,
    callback: (evt: Event) => void,
    shouldBubble?: boolean
  ) {
    this.remove(reactPropFromEventName(evtName));
  }
}

interface FoundationProps extends React.HTMLProps<any> {}
interface FoundationState {}

type FoundationPropsT<P> = P & FoundationProps;
type FoundationStateT<S> = S & FoundationState;

export class FoundationComponent<P, S extends any = {}> extends React.Component<
  FoundationPropsT<P>,
  FoundationStateT<S>
> {
  foundation: any;
  classList: { [key: string]: ClassListT } = {};
  propsList: { [key: string]: PropsList } = {};
  foundationRefs: { [key: string]: HTMLElement | null } = {};

  constructor(props: FoundationPropsT<P>) {
    super(props);
    this.foundation = this.getDefaultFoundation();
  }

  createElement(elementName: string) {
    this.createClassList(elementName);
    this.createPropsList(elementName);
    const classList = this.classList[elementName];
    const propsList = this.propsList[elementName];
    const getElement = () => this.foundationRefs[elementName] || null;
    const getClasses = () => classList.renderToString();
    return {
      addClass: classList.add,
      removeClass: classList.remove,
      hasClass: classList.has,
      get classes() {
        return getClasses();
      },
      addProp: propsList.add,
      removeProp: propsList.remove,
      getProp: propsList.get,
      props: (rest: any) => ({
        ...propsList.all(rest),
        className: getClasses()
      }),
      addEventListener: propsList.addEventListener,
      removeEventListener: propsList.removeEventListener,
      setElement: (el: Element | Text | null) => {
        if (el instanceof HTMLElement) {
          this.foundationRefs[elementName] = el;
        }
      },
      get element(): HTMLElement | null {
        return getElement();
      }
    };
  }

  createClassList(elementName: string) {
    const classes = new Set();
    this.classList[elementName] = {
      renderToString: () =>
        classNames(
          (elementName === 'root_' || elementName === 'root') &&
            this.props.className,
          [...classes]
        ),
      has: className => {
        return classes.has(className);
      },
      add: className => {
        if (!classes.has(className)) {
          classes.add(className);
          this.update();
        }
      },
      remove: className => {
        if (classes.has(className)) {
          classes.delete(className);
          this.update();
        }
      }
    };
  }

  update() {
    this.setState({});
  }

  createPropsList(elementName: string) {
    this.propsList[elementName] = new PropsList(() => this.update());
  }

  componentDidMount() {
    this.foundation.init();
    this.sync(this.props, {});
  }

  componentDidUpdate(prevProps: FoundationPropsT<P>) {
    this.sync(this.props, prevProps);
  }

  componentWillUnmount() {
    this.foundation && this.foundation.destroy();
    Object.values(this.propsList).forEach(p => (p.update = () => {}));
    this.propsList = {};
    this.classList = {};
    this.foundationRefs = {};
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
    if (this.foundation) {
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
