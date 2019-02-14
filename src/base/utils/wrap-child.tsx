import * as React from 'react';
import classNames from 'classnames';

interface WrapChildProps extends React.HTMLProps<any> {
  [key: string]: any;
}

export const wrapChild = (props: WrapChildProps) => {
  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ...props,
    ...child.props,
    className: classNames(props.className, child.props.className)
  });
};
