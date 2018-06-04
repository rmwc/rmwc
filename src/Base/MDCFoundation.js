// @flow
import * as React from 'react';
import classNames from 'classnames';

/************************************************************************
 * Utils
 ***********************************************************************/
const requestFrames = (
  callback,
  frameCount: number,
  currentFrame?: number = 0
) => {
  if (currentFrame < frameCount) {
    window.requestAnimationFrame(() =>
      requestFrames(callback, frameCount, currentFrame + 1)
    );
  } else {
    callback();
  }
};

/** Copies all known properties from source to target. This is being used in here for class merging. */
const copyProperties = (target, source) => {
  const allPropertyNames = Object.getOwnPropertyNames(source).concat(
    Object.getOwnPropertySymbols(source)
  );

  allPropertyNames.forEach(propertyName => {
    if (
      String(propertyName).match(
        // eslint-disable-next-line max-len
        /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
      )
    ) {
      return;
    }
    const value = Object.getOwnPropertyDescriptor(source, propertyName);
    value !== undefined && Object.defineProperty(target, propertyName, value);
  });
};

/** Simplifies redundant checks for syncWithProps */
export const syncFoundationProp = (
  prop: mixed,
  foundationValue: mixed,
  callback: () => mixed
) => {
  if (prop !== undefined && prop !== foundationValue) {
    callback();
  }
};

/************************************************************************
 * Handler Factories
 ***********************************************************************/
export const addClass = () =>
  function(className: string) {
    if (!this.state.classes.has(className)) {
      // The animation frame corrects an issue where MDC would set a class
      // on a form element and cause re-render before the new value could actually be set from the onChange

      this._safeSetState(prevState => ({
        classes: prevState.classes.add(className)
      }));
    }
  };

export const removeClass = () =>
  function(className: string) {
    if (this.state.classes.has(className)) {
      // The animation frame corrects an issue where MDC would set a class
      // on a form element and cause re-render before the new value could actually be set from the onChange
      this._safeSetState(prevState => ({
        classes: prevState.classes.delete(className)
          ? prevState.classes
          : prevState.classes
      }));
    }
  };

/************************************************************************
 * HOC
 ***********************************************************************/
type FoundationT = {
  constructor: Function,
  adapter?: {
    [functionName: string]: Function
  },
  refs?: string[]
};

type FoundationStateT = {
  classes: Set<string>
};

export const withFoundation = ({
  constructor: FoundationConstructor,
  adapter = {},
  refs = ['root_']
}: FoundationT): $Shape<constructor> => {
  class Foundation<P: Object, S: any> extends React.Component<
    P,
    S & FoundationStateT
  > {
    constructor(props: *) {
      super(props);

      this.foundationRefs = refs.reduce((acc, r) => {
        // Here we gracefully merge two refs together if one was passed down the chain
        const propName =
          this.props.elementRef && this.props.elementRef.refName_ === r
            ? 'elementRef'
            : r;

        acc[r] = ref => {
          // React will return a null ref when unmounting which will
          // in turn make our adapters error out. Make sure we only set a ref if its truthy.
          if (ref) {
            //$FlowFixMe
            this[r] = ref;
            this.props[propName] && this.props[propName](ref);
          }
        };

        // Store the refname on the object so we can reference it later and merge two of the same references together
        acc[r].refName_ = r;

        return acc;
      }, {});

      //$FlowFixMe
      this.syncWithProps = this.syncWithProps.bind(this);
    }

    componentDidMount() {
      this.initFoundation();
    }

    componentWillReceiveProps(nextProps: P) {
      this._safeSyncWithProps(nextProps);
    }

    componentWillUnmount() {
      this.destroyComponent();

      // We need to hold onto our refs until all child components are unmounted
      // Here we just wait a few frames and set them to null so garbage collection will take over.
      requestFrames(() => {
        refs.forEach(refName => {
          //$FlowFixMe
          this[refName] && (this[refName] = undefined);
        });
      }, 3);
    }

    _safeSyncWithProps(props: P) {
      this.foundation_ && this.syncWithProps(props);
    }

    _safeSetState(...args) {
      this.foundation_ && this.setState(...args);
    }

    state = {
      classes: new Set()
    };

    foundation_: ?Object;

    foundationRefs: { [string]: (ref: window.DomElement) => mixed };

    get classes() {
      return classNames(this.props.className, [...this.state.classes]);
    }

    initFoundation() {
      this.foundation_ = this.getDefaultFoundation();

      // bind custom adapter methods passed into the factory
      Object.entries(adapter).forEach(([handlerName, handler]) => {
        //$FlowFixMe
        this.foundation_.adapter_[handlerName] = handler.bind(this);
      });

      this.initialize();
      this.foundation_ && this.foundation_.init();
      this.initialSyncWithDOM();
      this._safeSyncWithProps(this.props);

      // this method should be deprecated in the future in favor of standard refs
      this.props.apiRef && this.props.apiRef(this);
    }

    destroyComponent() {
      this.destroy();
      this.foundation_ && this.foundation_.destroy();
      this.foundation_ = undefined;
    }

    syncWithProps(nextProps: P) {}
    initialize() {}
    initialSyncWithDOM() {}
    destroy() {}
    getDefaultFoundation() {
      return {};
    }

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

      const baseName = evtType
        .split(':')
        .slice(-1)
        .pop();
      const propName = `on${baseName.charAt(0).toUpperCase()}${baseName.slice(
        1
      )}`;

      this.props[propName] && this.props[propName](evt);

      // MDC can change state internally, if we are triggering a handler, re-sync with our props
      this._safeSyncWithProps(this.props);

      return evt;
    }

    listen(evtType, handler) {
      //$FlowFixMe
      this.root_.addEventListener(evtType, handler);
    }

    unlisten(evtType, handler) {
      //$FlowFixMe
      this.root_.removeEventListener(evtType, handler);
    }
  }

  copyProperties(Foundation.prototype, FoundationConstructor.prototype);

  return Foundation;
};
