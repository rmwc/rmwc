// @flow
import type { SimpleTagPropsT } from './simpleTag';
import * as React from 'react';

/************************************************************************
 * Utils
 ***********************************************************************/
const requestFrames = (
  callback: () => any,
  frameCount: number,
  currentFrame: number = 0
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
const copyProperties = (target: Object, source: Object) => {
  const allPropertyNames = Object.getOwnPropertyNames(source);

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
  callback: () => any
) => {
  if (prop !== undefined && prop !== foundationValue) {
    callback();
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

type FoundationPropsT<P> = P & SimpleTagPropsT;

export const withFoundation = ({
  constructor: FoundationConstructor,
  adapter = {},
  refs = ['root_']
}: FoundationT) => {
  const F = class Foundation<P> extends React.Component<FoundationPropsT<P>> {
    foundation_: {
      adapter_: any,
      init: Function,
      destroy: Function,
      [key: string]: any
    } | null;

    foundationRefs: { [name: string]: (ref: HTMLElement) => mixed };

    root_: Element | Text | null;

    props: FoundationPropsT<P>;

    constructor(props: FoundationPropsT<P>) {
      super(props);

      this.foundationRefs = refs.reduce((acc, r) => {
        // Here we gracefully merge two refs together if one was passed down the chain
        const propName =
          props.elementRef && props.elementRef.refName_ === r
            ? 'elementRef'
            : r;

        acc[r] = (ref: any) => {
          // React will return a null ref when unmounting which will
          // in turn make our adapters error out. Make sure we only set a ref if its truthy.
          if (ref) {
            //$FlowFixMe
            this[r] = ref;
            props[propName] &&
              typeof props === 'object' &&
              props[propName](ref);
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

    componentWillReceiveProps(nextProps: FoundationPropsT<P>) {
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

    _safeSyncWithProps(props: Object) {
      this.foundation_ && this.syncWithProps(props);
    }

    initFoundation() {
      this.foundation_ = this.getDefaultFoundation();

      // bind custom adapter methods passed into the factory
      for (const handlerName in adapter) {
        const handler = adapter[handlerName];
        //$FlowFixMe
        this.foundation_.adapter_[handlerName] = handler.bind(this);
      }

      this.initialize();
      this.foundation_ && this.foundation_.init();
      this.initialSyncWithDOM();
      this._safeSyncWithProps(this.props);

      // this method should be deprecated in the future in favor of standard refs
      typeof this.props.apiRef === 'function' && this.props.apiRef(this);
    }

    destroyComponent() {
      this.destroy();
      this.foundation_ && this.foundation_.destroy();
      this.foundation_ = null;
    }

    syncWithProps(nextProps: Object) {}
    initialize(...args: any[]) {}
    initialSyncWithDOM() {}
    destroy() {}
    getDefaultFoundation() {
      return {
        adapter_: {},
        init: () => {},
        destroy: () => {}
      };
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

      const baseName =
        evtType
          .split(':')
          .slice(-1)
          .pop() || '';
      const propName = `on${baseName.charAt(0).toUpperCase()}${baseName.slice(
        1
      )}`;

      this.props[propName] && this.props[propName](evt);

      // MDC can change state internally, if we are triggering a handler, re-sync with our props
      this._safeSyncWithProps(this.props);

      return evt;
    }

    listen(evtType: string, handler: Function) {
      const root: any = this.root_;
      root && root.addEventListener(evtType, handler);
    }

    unlisten(evtType: string, handler: Function) {
      const root: any = this.root_;
      root && root.removeEventListener(evtType, handler);
    }
  };

  copyProperties(F.prototype, FoundationConstructor.prototype);

  return F;
};
