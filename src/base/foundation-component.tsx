// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import { SpecificEventListener } from '@material/base/types';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { eventsMap } from './utils/events-map';
import { toCamel } from './utils/strings';
import { MDCFoundation } from '@material/base';
import { handleRef } from './component';

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
    this._events = {};
    this._style = {};
    this._props = {};
    this._classes = new Set();

    setTimeout(() => {
      this._ref = null;
    });
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
  Foundation extends MDCFoundation<any>,
  Elements extends { [key: string]: true },
  Api extends (
    params: {
      [key in keyof Elements]: FoundationElement<Props, HTMLElement>;
    } & { foundation: any }
  ) => any,
  Props extends {
    [key: string]: any;
    foundationRef?: React.Ref<Foundation | null>;
    apiRef?: (ref: ReturnType<Api> | null) => void;
  }
>({
  foundation: foundationFactory,
  props: inputProps,
  elements: elementsInput,
  api
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
  api?: Api;
}) => {
  const [, setIteration] = useState(0);

  const props = useRef(inputProps);
  props.current = inputProps;

  const elements = useMemo(
    () =>
      Object.keys(elementsInput).reduce<
        {
          [key in keyof Elements]: FoundationElement<any, HTMLElement>;
        }
      >((acc, key: keyof Elements) => {
        acc[key] = new FoundationElement<Props, HTMLElement>(() => {
          setIteration((val) => val + 1);
        });
        return acc;
      }, {} as any),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const foundation = useMemo(() => {
    // init foundation
    const f = foundationFactory({
      ...elements,
      getProps: () => props.current,
      emit: (...args) => emitFactory(props.current)(...args)
    });

    // handle apiRefs
    api && handleRef(props.current.apiRef, api({ foundation: f, ...elements }));

    return f;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const f = foundation;
    f.init();
    api && handleRef(props.current.apiRef, api({ foundation, ...elements }));
    handleRef(props.current.foundationRef, f);

    return () => {
      f.destroy();
      handleRef(props.current.apiRef, null);
      handleRef(props.current.foundationRef, null);
      Object.values(elements).map((element) => element.destroy());
      // @ts-ignore
      props.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundation, elements]);

  return { foundation: foundation, ...elements };
};
