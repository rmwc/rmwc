import * as React from 'react';
import classNames from 'classnames';
import { eventsMap } from './utils/events-map';
import { debounce } from './utils/debounce';
import { toCamel } from './utils/strings';

const reactPropFromEventName = (evtName: string) =>
  (eventsMap as { [key: string]: string })[evtName] || evtName;

class FoundationElement<
  Props extends { [key: string]: any },
  ElementType = HTMLElement
> {
  _classes = new Set<string>();
  _events: { [key: string]: (evt: Event) => void } = {};
  _style: { [key: string]: string | number | null } = {};
  _props: Partial<Props> = {};
  _ref = null;
  onChange = () => {};

  constructor(onChange: () => void) {
    this.onChange = onChange;
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.hasClass = this.hasClass.bind(this);
    this.addProp = this.addProp.bind(this);
    this.getProp = this.getProp.bind(this);
    this.removeProp = this.removeProp.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  destroy() {
    this.onChange = () => {};
    this._ref = null;
    this._events = {};
    this._style = {};
    this._props = {};
    this._classes = new Set();
  }

  /**************************************************
   * Classes
   **************************************************/
  addClass(className: string) {
    if (!this._classes.has(className)) {
      this._classes.add(className);
      this.onChange();
    }
  }

  removeClass(className: string) {
    if (this._classes.has(className)) {
      this._classes.delete(className);
      this.onChange();
    }
  }

  hasClass(className: string) {
    return this._classes.has(className);
  }

  /**************************************************
   * Props
   **************************************************/
  addProp(propName: keyof Props, value: any) {
    if (this._props[propName] !== value) {
      this._props[propName] = value;
      this.onChange();
    }
  }

  getProp(propName: keyof Props) {
    return this._props[propName];
  }

  removeProp(propName: keyof Props) {
    if (this._props[propName] !== undefined) {
      delete this._props[propName];
      this.onChange();
    }
  }

  props(propsToMerge: { [key: string]: any }) {
    const { className = '', style = {}, ...rest } = propsToMerge;

    // handle merging events
    // the foundation should be able to pass something onClick as well as a user
    // This wraps them in a function that calls both
    const mergedEvents = Object.entries(propsToMerge).reduce(
      (acc: any, [key, possibleCallback]) => {
        const existingCallback = this._props[key];
        if (
          typeof possibleCallback === 'function' &&
          typeof existingCallback === 'function'
        ) {
          const wrappedCallback = (evt: any) => {
            existingCallback(evt);
            return possibleCallback(evt);
          };

          acc[key] = wrappedCallback;
        }
        return acc;
      },
      {}
    );

    // handle className
    const mergedClasses = classNames(className, [...this._classes]);

    // handle styles
    const mergedStyles = {
      ...this._style,
      ...style
    };

    return {
      ...propsToMerge,
      ...this._props,
      ...mergedEvents,
      style: mergedStyles,
      className: mergedClasses
    };
  }

  /**************************************************
   * Styles
   **************************************************/
  setStyle(propertyName: string, value: number | string | null) {
    propertyName = propertyName.startsWith('--')
      ? propertyName
      : toCamel(propertyName);

    if (this._style[propertyName] !== value) {
      this._style[propertyName] = value;
      this.onChange();
    }
  }

  /**************************************************
   * Events
   **************************************************/
  addEventListener(
    evtName: string,
    callback: (evt: Event) => void,
    shouldBubble?: boolean
  ) {
    const propName = reactPropFromEventName(evtName);
    if (this._events[propName] !== callback) {
      this._events[propName] = callback;
      this.onChange();
    }
  }

  removeEventListener(
    evtName: string,
    callback: (evt: Event) => void,
    shouldBubble?: boolean
  ) {
    const propName = reactPropFromEventName(evtName);
    if (this._events[propName]) {
      delete this._events[propName];
      this.onChange();
    }
  }

  /**************************************************
   * Refs
   **************************************************/
  setRef(el: any) {
    if (el) {
      this._ref = el;
    }
  }

  get ref(): ElementType | null {
    return this._ref;
  }
}

interface FoundationProps extends React.HTMLProps<any> {
  ref?: any;
}
interface FoundationState {}

type FoundationPropsT<P> = P & FoundationProps;
type FoundationStateT<S> = S & FoundationState;

export class FoundationComponent<P, S extends any = {}> extends React.Component<
  FoundationPropsT<P>,
  FoundationStateT<S>
> {
  static shouldDebounce = false;

  foundation: any = this.getDefaultFoundation();
  elements: { [key: string]: FoundationElement<any, any> } = {};

  constructor(props: any) {
    super(props);
    //@ts-ignore
    if (this.constructor.shouldDebounce) {
      this.update = debounce(this.update.bind(this), 0);
    } else {
      this.update = this.update.bind(this);
    }
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
    this.foundation = null;
    Object.values(this.elements).forEach(el => el.destroy());
  }

  createElement<ElementType extends any = HTMLElement>(elementName: string) {
    const el = new FoundationElement<any, ElementType>(this.update);

    this.elements[elementName] = el;
    return el;
  }

  update() {
    this.foundation && this.setState({});
  }

  sync(props: any, prevProps?: any) {}

  syncProp(prop: any, prevProp: any, callback: () => void) {
    if (
      (prop !== undefined || (prevProp !== undefined && prop === undefined)) &&
      prop !== prevProp
    ) {
      callback();
    }
  }

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
      this.props[propName] && this.props[propName](evt);
    }

    return evt;
  }
}
