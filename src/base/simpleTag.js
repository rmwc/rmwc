// @flow
import * as React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions } from './withTheme';

type SimpleTagFactoryT = {
  tag?: string | React.ComponentType<any>,
  classNames?: string | string[] | ((props: Object) => mixed),
  defaultProps?: Object,
  consumeProps?: string[],
  wrap?: boolean,
  displayName?: string,
  className?: string
};

export type SimpleTagPropsT = {
  tag?: string | React.ComponentType<any>,
  wrap?: boolean,
  elementRef?: any,
  theme?: string | string[]
  //$FlowFixMe
} & React.HTMLAttributes<any> &
  //$FlowFixMe
  React.HTMLProps<any>;

export const simpleTag = ({
  displayName = 'SimpleTag',
  defaultProps = {},
  consumeProps = [],
  tag,
  wrap: defaultWrap = false,
  classNames
}: SimpleTagFactoryT): React.ComponentType<SimpleTagPropsT> => {
  const defaultTag = tag || 'div';

  const S = class SimpleTag<P> extends React.Component<P & SimpleTagPropsT> {
    static displayName = displayName;

    static defaultProps = {
      ...defaultProps,
      tag: defaultTag
    };

    static isSimpleTag = true;

    render() {
      const tsxProps: any = this.props;
      const {
        tag,
        className,
        wrap = false,
        elementRef,
        theme,
        ...rest
      } = tsxProps;

      // choose the tag we are going to render

      const Component: any =
        typeof defaultTag === 'function' && typeof tag === 'string'
          ? defaultTag
          : tag || defaultTag;

      // consume any props that shouldnt be passed along
      const safeRest = { ...rest };
      consumeProps.forEach(p => {
        delete safeRest[p];
      });

      // sometimes we are extending a component, we can still honor a text based tag
      if (typeof defaultTag === 'function' && typeof tag === 'string') {
        safeRest.tag = tag;
      }

      // handle elementRefs
      if (elementRef) {
        // if the tag is a string, make our ref
        // otherwise pass elementRef along
        if (typeof Component === 'string') {
          safeRest.ref = elementRef;
        } else {
          safeRest.elementRef = elementRef;
        }
      }

      // generate the final classnames for the component
      const safeClassNames = classNamesFunc(
        className,
        parseThemeOptions(theme || null),
        typeof classNames === 'function' ? classNames(rest) : classNames
      );

      // handle wrapping components
      if (wrap || defaultWrap) {
        // sometimes we have undefined children
        if (!rest.children) return null;

        // make sure we delete our children here
        // so we dont recursively clone ourselves
        delete safeRest.children;
        const child = React.Children.only(rest.children);
        return React.cloneElement(child, {
          ...child.props,
          ...safeRest,
          ...{
            className: [safeClassNames, child.props.className]
              .filter(Boolean)
              .join(' ')
          }
        });
      }

      // default return
      return <Component className={safeClassNames} {...safeRest} />;
    }
  };

  return S;
};
