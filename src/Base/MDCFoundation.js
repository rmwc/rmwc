// @flow
import * as React from 'react';
import classNames from 'classnames';

function copyProperties(target, source) {
  const allPropertyNames = Object.getOwnPropertyNames(source).concat(
    Object.getOwnPropertySymbols(source)
  );

  allPropertyNames.forEach(propertyName => {
    if (
      propertyName.match(
        /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
      )
    ) {
      return;
    }
    Object.defineProperty(
      target,
      propertyName,
      Object.getOwnPropertyDescriptor(source, propertyName)
    );
  });
}

export const foundationFactory = ({
  constructor: FoundationConstructor,
  adapter,
  refs = ['root_'],
  defaultHandlers = [],
  syncWithProps = () => {}
}) => Component => {
  class MyFoundation extends React.Component {
    constructor(props) {
      super(props);
      console.log(this);

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

      this.foundation_ = this.getDefaultFoundation();

      const handlers = {
        hasClass: className => this.root_.classList.contains(className),
        addClass: className =>
          this.setState(prevState => ({
            classes: prevState.classes.add(className)
          })),
        removeClass: className =>
          this.setState(prevState => ({
            classes: prevState.classes.delete(className) ?
              prevState.classes :
              prevState.classes
          })),
        registerInteractionHandler: (type, handler) => {
          if (this.root_) {
            this.root_.addEventListener(type, handler);
          }
        },
        deregisterInteractionHandler: (type, handler) => {
          if (this.root_) {
            this.root_.removeEventListener(type, handler);
          }
        }
      };

      defaultHandlers.forEach(handler => {
        this.foundation_[handler] = handlers[handler];
        this.foundation_[handler] = this.foundation_[handler].bind(
          this.foudnation_
        );
      });
    }

    state = {
      classes: new Set()
    };

    componentDidMount() {
      this.foundation_.init();
      this.isInit = true;
    }

    componentWillReceiveProps(nextProps: T) {
      this.isInit && syncWithProps && syncWithProps(this, nextProps);
    }

    componentWillUnmount() {
      this.foundation_.destroy();
    }

    destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      this.foundation_.destroy();
    }

    /**
     * Wrapper method to add an event listener to the component's root element. This is most useful when
     * listening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */
    listen(evtType, handler) {
      this.root_.addEventListener(evtType, handler);
    }

    /**
     * Wrapper method to remove an event listener to the component's root element. This is most useful when
     * unlistening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */
    unlisten(evtType, handler) {
      this.root_.removeEventListener(evtType, handler);
    }

    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type,
     * with the given data.
     * @param {string} evtType
     * @param {!Object} evtData
     * @param {boolean=} shouldBubble
     */
    emit(evtType, evtData, shouldBubble = false) {
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

      this.root_.dispatchEvent(evt);
    }

    render() {
      const { className, ...rest } = this.props;
      return (
        <Component
          className={classNames(className, [...this.state.classes])}
          {...rest}
          {...this.refHandlers}
        />
      );
    }
  }

  copyProperties(MyFoundation.prototype, FoundationConstructor.prototype);

  return MyFoundation;
};
