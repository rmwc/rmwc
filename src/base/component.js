// @flow
import * as React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions } from './withTheme';
import { deprecationWarning } from './utils/deprecationWarning';

export type ComponentPropsT<P = {}> = {
  className?: string,
  elementRef?: React.Ref<any>,
  theme?: string | string[],
  tag?: string | React.ComponentType<any>
} & P &
  //$FlowFixMe
  React.HTMLAttributes<any> &
  //$FlowFixMe
  React.HTMLProps<any>;

export class Component<P> extends React.Component<ComponentPropsT<P>> {
  static displayName = 'UnknownComponent';

  tag: string | React.ComponentType<any> = 'div';
  consumeProps: string[] = [];
  classNames: ((props: any) => any[]) | string[] = () => [];
  deprecate: {
    [oldPropName: string]: string | [string, (value: any) => mixed]
  } = {};

  /**
   * All of these functions mutate the props object directly
   */
  handleClassNames(props: any) {
    const { className, theme } = this.props;
    const tsxSafeTheme: any = theme;
    props.className = classNamesFunc(
      className,
      ...(!!tsxSafeTheme ? parseThemeOptions(tsxSafeTheme) : []),
      ...(typeof this.classNames === 'function'
        ? this.classNames(this.props)
        : this.classNames)
    );
  }

  handleTag(props: any) {
    const { tag } = this.props;
    // Handle the case where we are extending a component but passing
    // a string as a tag. For instance, extending an Icon but rendering a span
    if (typeof this.tag === 'function' && typeof tag === 'string') {
      props.tag = tag;
    }
  }

  handleElementRef(props: any) {
    const { elementRef } = this.props;

    // handle elementRefs
    if (elementRef) {
      // if the tag is a string, make our ref
      // otherwise pass elementRef along
      if (typeof this.tag === 'string') {
        props.ref = elementRef;
      } else {
        props.elementRef = elementRef;
      }
    }
  }

  handleDeprecations(props: any) {
    for (const oldPropName in this.deprecate) {
      const newProp = this.deprecate[oldPropName];
      const displayName = this.constructor['displayName'];
      let newPropName;
      let transformProp = value => value;

      if (Array.isArray(newProp)) {
        newPropName = newProp[0];
        transformProp = newProp[1];
      } else {
        newPropName = newProp;
      }

      if (props[oldPropName] !== undefined) {
        if (newPropName === '') {
          deprecationWarning(
            `prop '${oldPropName}' has been removed from the ${displayName ||
              ''} component and is no longer a valid prop.`
          );
        } else {
          props[newPropName] = transformProp(props[oldPropName]);
          let propTransformMessage = '';
          if (props[newPropName] !== props[oldPropName]) {
            propTransformMessage = ` The old value has also been converted from '${
              props[newPropName]
            }' to '${props[oldPropName]}'`;
          }

          deprecationWarning(
            `prop '${oldPropName}' has been replaced with '${newPropName}' on the ${displayName ||
              ''} component.${propTransformMessage}`
          );
        }

        delete props[oldPropName];
      }
    }
  }

  handleConsumeProps(props: any) {
    this.consumeProps.forEach(p => {
      delete props[p];
    });
  }

  /**
   * A convenience function fro getting the props that are safe to pass
   * To the final rendered tag
   */
  getProps() {
    const tsxSafeProps: any = this.props;
    const { elementRef, className, theme, tag, ...rest } = tsxSafeProps;
    const props: any = rest;

    this.handleClassNames(props);
    this.handleTag(props);
    this.handleElementRef(props);
    this.handleDeprecations(props);
    this.handleConsumeProps(props);
    return props;
  }

  /**
   * Gets the tag to render
   */
  getTag(): any {
    return typeof this.tag === 'function' && typeof this.props.tag === 'string'
      ? this.tag
      : this.props.tag || this.tag;
  }

  render() {
    const Tag = this.getTag();
    return <Tag {...this.getProps()} />;
  }
}
