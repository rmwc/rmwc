// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { noop } from './noop';

export type WithMDCPropsT = {
  apiRef: (apiInstance: Object) => mixed
};

type WithMDCOpts = {
  displayName?: string,
  defaultProps?: Object,
  mdcConstructor?: Function,
  mdcEvents?: Object,
  mdcElementRef?: boolean,
  onMount?: (currentProps: ?Object, api: ?Object, inst: Object) => mixed,
  onUpdate?: (
    currentProps: ?Object,
    nextProps: Object,
    api: ?Object,
    inst: Object
  ) => mixed
};

/**
 * HOC that adds ripples to any component
 */
export const withMDC = ({
  mdcConstructor: MDCConstructor,
  mdcEvents = {},
  mdcElementRef = false,
  defaultProps = {},
  onMount = noop,
  onUpdate = noop
}: WithMDCOpts) => (
  Component: React.ComponentType<any>
): React.ComponentType<any> => {
  return class extends React.Component<WithMDCPropsT> {
    static defaultProps = {
      apiRef: noop,
      ...defaultProps
    };

    static displayName = `withMDC(${Component.displayName})`;

    mdcApi: Object = undefined;
    mdcListeners = [];
    mdcRootElement = undefined;
    elementRefProps = {};

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

    componentWillUnmount() {
      this.mdcComponentDestroy();
    }

    mdcComponentInit() {
      if (MDCConstructor) {
        const el = this.mdcGetRootElement();

        // a stupid hack for the test environment where this ends up undefined
        if (process.env.NODE_ENV === 'test') {
          if (el) {
            el.dataset = {};
          }
        }

        try {
          this.mdcApi = new MDCConstructor(el);
          this.props.apiRef(this.mdcApi);
        } catch (err) {
          console.warn(
            `${
              MDCConstructor.name
            } failed to initialize because of the following error:`,
            err
          );
        }
      }
      onMount(this.props, this.mdcApi, this);

      Object.entries(mdcEvents).forEach(([eventName, handler]) => {
        this.mdcRegisterListener(eventName, handler);
      });

      onUpdate(undefined, this.props, this.mdcApi, this);
    }

    mdcComponentReinit() {
      this.mdcComponentDestroy();
      this.mdcComponentInit();
    }

    mdcComponentDestroy() {
      this.mdcUnregisterAllListeners();
      this.mdcApi && this.mdcApi.destroy();
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
