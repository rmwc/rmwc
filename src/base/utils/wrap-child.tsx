import * as React from 'react';
import classNames from 'classnames';

export const wrapChild = (props: any) => {
  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ...props,
    ...child.props,
    // @ts-ignore
    className: classNames(props.className, child.props.className)
  });
};
