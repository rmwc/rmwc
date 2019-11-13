import * as RMWC from '@rmwc/types';
import { SpecificEventListener } from '@material/base/types';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { eventsMap } from './utils/events-map';
import { debounce } from './utils/debounce';
import { toCamel } from './utils/strings';
import MDCFoundation from '@material/base/foundation';

const reactPropFromEventName = (evtName: string) =>
  (eventsMap as { [key: string]: string })[evtName] || evtName;

export class FoundationElement<Props extends {}, ElementType = HTMLElement> {
  private _classes = new Set<string>();
  private _events: { [key: string]: (evt: Event) => void } = {};
  private _style: { [key: string]: string | number | null } = {};
  private _props: Partial<Props> = {};
  private _ref = null;
  _onChange: (() => void) | null = null;

  constructor(onChange: () => void) {
    this._onChange = onChange;
    this.onChange = this.onChange.bind(this);
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.hasClass = this.hasClass.bind(this);
    this.setProp = this.setProp.bind(this);
    this.getProp = this.getProp.bind(this);
    this.removeProp = this.removeProp.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  onChange() {
    this._onChange && this._onChange();
  }

  destroy() {
    this._onChange = null;
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
  setProp(propName: keyof Props, value: any, silent: boolean = false) {
    if (this._props[propName] !== value) {
      this._props[propName] = value;
      !silent && this.onChange();
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
    const { className = '', style = {} } = propsToMerge;

    // handle merging events
    // the foundation should be able to pass something onClick as well as a user
    // This wraps them in a function that calls both
    const mergedEvents = Object.entries(propsToMerge).reduce(
      (acc: any, [key, possibleCallback]) => {
        const existingCallback = this._events[key];
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
      { ...this._events }
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
  addEventListener(evtName: string, callback: SpecificEventListener<any>) {
    const propName = reactPropFromEventName(evtName);
    if (this._events[propName] !== callback) {
      this._events[propName] = callback;
      this.onChange();
    }
  }

  removeEventListener(evtName: string, callback: SpecificEventListener<any>) {
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
type ExtractProps<
  TComponentOrTProps
> = TComponentOrTProps extends React.Component<infer TProps, any>
  ? TProps
  : TComponentOrTProps;

export interface FoundationProps extends RMWC.ComponentProps {}

interface FoundationState {}

type FoundationPropsT<P> = RMWC.MergeInterfacesT<P, FoundationProps>;
type FoundationStateT<S> = S & FoundationState;

export class FoundationComponent<
  Foundation extends any,
  P,
  S extends any = {}
> extends React.Component<FoundationPropsT<P>, FoundationStateT<S>> {
  static shouldDebounce = false;

  foundation!: Foundation;
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
    this.foundation = this.getDefaultFoundation();
    this.foundation.init();
    this.sync(this.props, {});
  }

  componentDidUpdate(prevProps: FoundationPropsT<P>) {
    this.sync(this.props, prevProps);
  }

  componentWillUnmount() {
    this.foundation && this.foundation.destroy();
    // @ts-ignore
    this.foundation = undefined;
    Object.values(this.elements).forEach(el => el.destroy());
  }

  createElement<ElementType extends any = HTMLElement>(elementName: string) {
    const el = new FoundationElement<ExtractProps<ElementType>, ElementType>(
      this.update
    );

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

  getDefaultFoundation() {
    return ({
      init: () => {},
      destroy: () => {}
    } as unknown) as Foundation;
  }

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   */
  emit(evtType: string, evtData: any, shouldBubble: boolean = false) {
    let evt;

    evt = new CustomEvent(evtType, {
      detail: evtData,
      bubbles: shouldBubble
    });

    // bugfix for events coming from form elements
    // and also fits with reacts form pattern better...
    // This should always otherwise be null since there is no target
    // for Custom Events
    Object.defineProperty(evt, 'target', {
      value: evtData,
      writable: false
    });

    Object.defineProperty(evt, 'currentTarget', {
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

const emitFactory = (props: { [key: string]: any }) => (
  evtType: string,
  evtData: any,
  shouldBubble: boolean = false
) => {
  let evt;

  evt = new CustomEvent(evtType, {
    detail: evtData,
    bubbles: shouldBubble
  });

  // bugfix for events coming from form elements
  // and also fits with reacts form pattern better...
  // This should always otherwise be null since there is no target
  // for Custom Events
  Object.defineProperty(evt, 'target', {
    value: evtData,
    writable: false
  });

  Object.defineProperty(evt, 'currentTarget', {
    value: evtData,
    writable: false
  });

  // Custom handling for React
  const propName = evtType;

  props[propName] && props[propName](evt);

  return evt;
};

export const useFoundation = <
  Foundation extends MDCFoundation,
  Elements extends { [key: string]: true },
  Props extends { [key: string]: any }
>({
  foundation: _foundation,
  props: _props,
  elements: elementsInput
}: {
  foundation: (
    elements: {
      [key in keyof Elements]: FoundationElement<Props, HTMLElement>;
    } & {
      getProps: () => Props;
      emit: (
        evtType: string,
        evtData: any,
        shouldBubble?: boolean
      ) => CustomEvent<any>;
    }
  ) => Foundation;
  props: Props;
  elements: Elements;
}) => {
  const [, setIteration] = useState(0);

  const props = useRef(_props);
  props.current = _props;

  const elements = useRef(
    Object.keys(elementsInput).reduce<
      { [key in keyof Elements]: FoundationElement<Props, HTMLElement> }
    >((acc, key: keyof Elements) => {
      acc[key] = new FoundationElement<Props, HTMLElement>(() => {
        setIteration(val => val + 1);
      });
      return acc;
    }, {} as any)
  );

  const foundation = useRef(
    _foundation({
      ...elements.current,
      getProps: () => props.current,
      emit: (...args) => emitFactory(props.current)(...args)
    })
  );

  useEffect(() => {
    // eslint-disable-next-line
    return () => foundation.current.destroy();
  }, []);

  return { foundation: foundation.current, ...elements.current };
};
