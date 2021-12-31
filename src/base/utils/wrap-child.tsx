import React from 'react';
//@ts-ignore
import classNames from 'classnames';

export const wrapChild = (props: { [key: string]: any }) => {
  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ...props,
    ...child.props,
    className: classNames(props.className, child.props.className),
    style: { ...child.props.style, ...props.style }
  });
};
