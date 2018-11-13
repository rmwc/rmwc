// @flow
import * as React from 'react';
import { FoundationComponent } from '@rmwc/base';
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';

export type NotchedOutlinePropsT = {};

export class NotchedOutlineIdle extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-notched-outline__idle" />;
  }
}

export class NotchedOutline extends FoundationComponent<NotchedOutlinePropsT> {
  static displayName = 'NotchedOutline';
  root_: null | HTMLElement;
  path_: null | Element;

  constructor(props: NotchedOutlinePropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCNotchedOutlineFoundation({
      getWidth: () => this.root_ && this.root_.offsetWidth,
      getHeight: () => this.root_ && this.root_.offsetHeight,
      addClass: className => this.classList.root_.add(className),
      removeClass: className => this.classList.root_.remove(className),
      setOutlinePathAttr: value =>
        this.path_ && this.path_.setAttribute('d', value),

      getIdleOutlineStyleValue: (propertyName): any => {
        if (this.root_) {
          const idleOutlineElement = this.root_.nextElementSibling;
          if (!idleOutlineElement) return undefined;
          return window
            .getComputedStyle(idleOutlineElement)
            .getPropertyValue(propertyName);
        }
      }
    });
  }

  render() {
    return (
      <div
        {...this.props}
        {...this.propsList.root_.all()}
        ref={ref => (this.root_ = ref)}
        className={`mdc-notched-outline ${this.classList.root_.renderToString()}`}
      >
        <svg>
          <path
            className="mdc-notched-outline__path"
            ref={ref => (this.path_ = ref)}
          />
        </svg>
      </div>
    );
  }
}
