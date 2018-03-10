// @flow
import * as React from 'react';
import classNames from 'classnames';

type FoundationT = {
  /** The Foundation constructor */
  constructor: Function,
  /** Refs to handle */
  refs?: string[],
  /** The implemented foundation adapter  */
  adapter: (inst: React.Component<*, *>) => Object,
  /** Common handlers for the adapter  */
  defaultHandlers?: string[],
  /** Syncs the react and foundation state  */
  syncWithProps?: (inst: React.Component<*, *>, props: *) => mixed
};

type FoundationStateT = {
  classes: Set<string>
};

const getDefaultFoundationHandlers = (handlersArray, inst) => {
  const handlers = {
    hasClass: className => inst.root_.classList.contains(className),
    addClass: className =>
      inst.setState(prevState => ({
        classes: prevState.classes.add(className)
      })),
    removeClass: className =>
      inst.setState(prevState => ({
        classes: prevState.classes.delete(className) ?
          prevState.classes :
          prevState.classes
      })),
    registerInteractionHandler: (type, handler) => {
      if (inst.root_) {
        inst.root_.addEventListener(type, handler);
      }
    },
    deregisterInteractionHandler: (type, handler) => {
      if (inst.root_) {
        inst.root_.removeEventListener(type, handler);
      }
    }
  };

  return handlersArray.reduce((acc, key) => {
    acc[key] = handlers[key];
    return acc;
  }, {});
};

export const withMDCFoundation = ({
  constructor: FoundationConstructor,
  adapter,
  refs = ['root_'],
  defaultHandlers = [],
  syncWithProps
}: FoundationT) => {
  return <T>(Component: React.ComponentType<T>) =>
    class extends React.Component<T, FoundationStateT> {
      static displayName = `withMDCFoundation(${Component.displayName ||
        'Unknown'})`;

      constructor(props: T) {
        super(props);

        this.refHandlers = refs.reduce((acc, r) => {
          const propName =
            this.props.elementRef && this.props.elementRef.refName === r ?
              'elementRef' :
              r;

          acc[propName] = ref => {
            this[r] = ref;
            this.props[propName] && this.props[propName](ref);
          };

          acc[propName].refName = r;

          return acc;
        }, {});
      }

      componentDidMount() {
        const api = this.foundation.init();
        this.props.apiRef && this.props.apiRef(this.foundation);
        syncWithProps && syncWithProps(this, this.props);
      }

      componentWillReceiveProps(nextProps: T) {
        this.root_ && syncWithProps && syncWithProps(this, nextProps);
      }

      componentWillUnmount() {
        this.foundation.destroy();
      }

      root_: window.DOMElement = undefined;

      state = {
        classes: new Set()
      };

      foundation = new FoundationConstructor({
        ...getDefaultFoundationHandlers(defaultHandlers, this),
        ...adapter(this)
      });

      refHandlers = {};

      handleElementRef(ref: window.DOMElement) {
        this.root_ = ref;
        this.props.elementRef && this.props.elementRef(ref);
      }

      render() {
        const { className, ...rest } = this.props;
        console.log(this.refHandlers);
        return (
          <Component
            {...rest}
            {...this.refHandlers}
            className={classNames(className, [...this.state.classes])}
          />
        );
      }
    };
};
