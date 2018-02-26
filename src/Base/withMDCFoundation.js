// @flow
import * as React from 'react';

type FoundationT = {
  /** The Foundation constructor */
  constructor: Function,
  /** The implemented foundation adapter  */
  adapter: (inst: React.Component<*, *>) => Object,
  /** Common handlers for the adapter  */
  defaultHandlers: string[],
  /** Syncs the react and foundation state  */
  syncWithProps: (inst: React.Component<*, *>, props: *) => mixed
};

type FoundationStateT = {
  classes: Set<string>
};

const getDefaultFoundationHandlers = (handlersArray, inst) => {
  const handlers = {
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
  defaultHandlers = [],
  syncWithProps
}: FoundationT) => {
  return <T>(Component: React.ComponentType<T>) =>
    class extends React.Component<T, FoundationStateT> {
      constructor(props: T) {
        super(props);

        this.handleElementRef = this.handleElementRef.bind(this);
      }

      componentDidMount() {
        this.foundation.init();
        syncWithProps && syncWithProps(this, this.props);
      }

      componentWillReceiveProps(nextProps: T) {
        syncWithProps && syncWithProps(this, nextProps);
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

      handleElementRef(ref: window.DOMElement) {
        this.root_ = ref;
      }

      render() {
        const { ...rest } = this.props;

        return (
          <Component
            elementRef={this.handleElementRef}
            {...rest}
            className={[...this.state.classes].join(' ')}
          />
        );
      }
    };
};
