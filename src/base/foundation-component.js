// @flow
import * as React from 'react';
import classNames from 'classnames';

type ClassListT = {
  get: () => string,
  add: (className: string) => void,
  remove: (className: string) => void
};

type PropsListT = {
  get: () => { [key: string]: any },
  add: (propName: string, value: any) => void,
  remove: (propName: string) => void
};

type FoundationPropsT<P> = P &
  //$FlowFixMe
  React.HTMLAttributes<any> &
  //$FlowFixMe
  React.HTMLProps<any>;

export class FoundationComponent<P> extends React.Component<
  FoundationPropsT<P>
> {
  foundation_: any;
  classList: { [key: string]: ClassListT } = {};
  propsList: { [key: string]: PropsListT } = {};

  createClassList(elementName) {
    const classes = new Set();
    this.classList[elementName] = {
      get: () =>
        classNames(elementName === 'root_' && this.props.className, [
          ...classes
        ]),
      add: className => {
        if (!classes.has(className)) {
          classes.add(className);
          this.setState({});
        }
      },
      remove: className => {
        if (classes.has(className)) {
          classes.delete(className);
          this.setState({});
        }
      }
    };
  }

  createPropsList(elementName) {
    let props = {};
    this.propsList[elementName] = {
      get: () => props,
      add: (propName, value) => {
        props = {
          ...props,
          propName: value
        };
        this.setState({});
      },
      remove: propName => {
        delete props[propName];
        props = {
          ...props
        };
        this.setState({});
      }
    };
  }

  componentDidMount() {
    this.foundation_ = this.getDefaultFoundation();
    this.syncWithDOM(this.props);
  }

  componentDidUpdate() {
    this.syncWithDOM(this.props);
  }

  componentWillUnmount() {
    this.foundation_ && this.foundation_.destroy();
    this.propsList = {};
    this.classList = {};
  }

  syncWithDOM(props: any) {}

  getDefaultFoundation() {}
}
