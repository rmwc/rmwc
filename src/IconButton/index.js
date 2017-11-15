// @flow
import * as React from 'react';
import Button from '../Button';
import Icon from '../Icon';

type IconButtonPropsT = {
  /* The icon to use */
  use?: string,
  /* Specify the icon to use as a children */
  children?: React.Node
};

export const IconButton = ({ children, use, ...rest }: IconButtonPropsT) => {
  // styles ripped from Angular Material https://material.angularjs.org/latest/demo/button
  const buttonStyle = {
    marginLeft: '6px',
    marginRight: '6px',
    height: '40px',
    minWidth: '0',
    lineHeight: '24px',
    padding: '8px',
    width: '40px',
    borderRadius: '50%'
  };

  const mergedStyle = {
    ...buttonStyle,
    ...(rest.style || {})
  };

  const iconName = use || children;
  return (
    <Button {...rest} style={mergedStyle}>
      <Icon use={iconName} />
    </Button>
  );
};
export default IconButton;
