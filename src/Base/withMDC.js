// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { noop } from './noop';

export type WithMDCPropsT = {
  apiRef: (apiInstance: Object) => mixed
};

type WithMDCOpts = {
  /** Components displayName */
  displayName?: string,
  /** Components defaultProps */
  defaultProps?: Object,
  /** a reference to an MDCConstructor */
  mdcConstructor?: Function,
  /** In some cases, the constructor needs to be determined by props. This function should take props and return an MDCConstrustor or null */
  getMdcConstructor?: (props: Object) => ?Function,
  /** MDC events mapped from eventName => handler */
  mdcEvents?: Object,
  /** Decides wether or not to pass down an elementRef */
  mdcElementRef?: boolean,
  /** component on mount */
  onMount?: (currentProps: ?Object, api: ?Object, inst: Object) => mixed,
  /** component on update */
  onUpdate?: (
    currentProps: ?Object,
    nextProps: Object,
    api: ?Object,
    inst: Object
  ) => mixed,
  /** component did update */
  didUpdate?: (
    currentProps: ?Object,
    nextProps: Object,
    api: ?Object,
    inst: Object
  ) => mixed,
  /** This is a cssOnly component, it will shortcircuit the constructor */
  cssOnly?: boolean
};

/**
 * HOC that adds ripples to any component
 */
export const withMDC = ({
  mdcConstructor: MDCConstructor,
  getMdcConstructor = () => null,
  mdcEvents = {},
  mdcElementRef = false,
  defaultProps = {},
  onMount = noop,
  onUpdate = noop,
  didUpdate = noop
}: WithMDCOpts) => (
  Component: React.ComponentType<any>
): React.ComponentType<any> => {
  return class extends React.Component<WithMDCPropsT> {
    static displayName = `withMDC(${Component.displayName})`;

    static defaultProps = {
      apiRef: noop,
      ...defaultProps
    };

    constructor(props) {
      super(props);
      this.mdcSetRootElement = this.mdcSetRootElement.bind(this);
      this.elementRefProps = mdcElementRef ?
        {
          mdcElementRef: this.mdcSetRootElement
        } :
        {};
    }

    componentDidMount(): void {
      this.mdcComponentInit();
    }

    componentWillUpdate(nextProps: WithMDCPropsT) {
      onUpdate(this.props, nextProps, this.mdcApi, this);
    }

    componentDidUpdate(prevProps: WithMDCPropsT): void {
      didUpdate(prevProps, this.props, this.mdcApi, this);
    }

    componentWillUnmount() {
      this.mdcComponentDestroy();
    }

    mdcApi: ?Object;
    mdcListeners = [];
    mdcRootElement;
    elementRefProps = {};

    mdcComponentInit() {
      const MDCConstructorToUse =
        MDCConstructor || getMdcConstructor(this.props);

      if (MDCConstructorToUse && !this.props.cssOnly) {
        const el = this.mdcGetRootElement();
        try {
          this.mdcApi = new MDCConstructorToUse(el);
          this.props.apiRef(this.mdcApi);
        } catch (err) {
          console.warn(
            `${
              MDCConstructorToUse.name
            } failed to initialize because of the following error:`,
            err
          );
        }
      }
      onMount(this.props, this.mdcApi, this);

      // register event listeners
      Object.entries(
        typeof mdcEvents === 'function' ? mdcEvents(this.props) : mdcEvents
      ).forEach(([eventName, handler]) => {
        this.mdcRegisterListener(eventName, handler);
      });

      onUpdate(undefined, this.props, this.mdcApi, this);
      didUpdate(undefined, this.props, this.mdcApi, this);
    }

    mdcComponentReinit() {
      this.mdcComponentDestroy();
      this.mdcComponentInit();
    }

    mdcComponentDestroy() {
      this.mdcUnregisterAllListeners();
      this.mdcApi && this.mdcApi.destroy();
      this.mdcApi = null;
    }

    mdcRegisterListener(
      eventName: string,
      func: (Event, Object, Object) => mixed
    ) {
      const wrappedHandler = (evt: Event) => func(evt, this.props, this.mdcApi);
      this.mdcApi && this.mdcApi.listen(eventName, wrappedHandler);
      this.mdcListeners.push(
        () => this.mdcApi && this.mdcApi.unlisten(eventName, wrappedHandler)
      );
    }

    mdcUnregisterAllListeners() {
      this.mdcListeners.forEach(unlisten => unlisten());
      this.mdcListeners.length = 0;
    }

    mdcSetRootElement(el: HTMLElement): HTMLElement {
      this.mdcRootElement = el;
      return el;
    }

    mdcGetRootElement() {
      return this.mdcRootElement || ReactDOM.findDOMNode(this);
    }

    render() {
      const { apiRef, ...rest } = this.props;
      return <Component {...this.elementRefProps} {...rest} />;
    }
  };
};
