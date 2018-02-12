// @flow
import * as React from 'react';

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
  foundation: componentFoundation,
  defaultFoundationHandlers = []
}) => {
  return Component =>
    class extends React.Component<{}, FoundationStateT> {
      constructor(props) {
        super(props);

        this.handleElementRef = this.handleElementRef.bind(this);
      }

      componentDidMount() {
        this.foundation.init();
      }
      componentWillUnmount() {
        this.foundation.destroy();
      }

      root_: window.DOMElement = undefined;

      state = {
        classes: new Set()
      };

      foundation = new FoundationConstructor({
        ...getDefaultFoundationHandlers(defaultFoundationHandlers, this),
        ...componentFoundation(this)
      });

      handleElementRef(ref) {
        this.root_ = ref;
      }

      render() {
        const { ...rest } = this.props;
        const { classes } = this.props;
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
