import * as React from 'react';
import * as RMWC from '@rmwc/types';
import { componentFactory } from '@rmwc/base';
import { Icon, IconProps } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';

export interface AvatarProps {
  /** The url for the image. This gets passed to the Icon component. */
  src?: string;
  /** The size of the avatar */
  size?: RMWC.IconSizeT;
  /** The name of the user. This will get converted to initials and set the hover title. */
  name?: string;
  /** Make the avatar square. */
  square?: boolean;
  /** Make the avatar interactive. */
  interactive?: boolean;
}

const getInitialsForName = (name = '') => {
  if (name) {
    const parts = name.split(' ');
    let letters = (parts[0] || '')[0];
    if (parts.length > 1) {
      const part = parts.pop();
      if (part) {
        letters += part[0];
      }
    }
    return letters;
  }

  return '';
};

const AvatarRoot = withRipple()(
  componentFactory<
    {
      isCount?: boolean;
      overflow?: boolean;
      smallerText?: boolean;
      square?: boolean;
      interactive?: boolean;
    } & IconProps
  >({
    displayName: 'AvatarRoot',
    classNames: props => [
      'rmwc-avatar',
      {
        [`rmwc-avatar--${props.size}`]: props.size,
        'rmwc-avatar--count': props.isCount,
        'rmwc-avatar--interactive': props.interactive,
        'rmwc-avatar--count-overflow': props.overflow,
        'rmwc-avatar--smaller-text': props.smallerText,
        'rmwc-avatar--square': props.square
      }
    ],
    tag: Icon,
    consumeProps: [
      'isCount',
      'overflow',
      'smallerText',
      'square',
      'interactive'
    ]
  })
);

export interface AvatarGroupProps {
  /** Makes the list dense */
  dense?: boolean;
}

/** A container for groups of Avatars */
export const AvatarGroup = componentFactory<AvatarGroupProps>({
  displayName: 'AvatarGroup',
  classNames: props => [
    'rmwc-avatar-group',
    {
      'rmwc-avatar-group--dense': props.dense
    }
  ],
  consumeProps: ['dense']
});

/** An Avatar component for displaying users in a system. */
export const Avatar = ({
  src,
  size,
  name = '',
  interactive = false,
  ...rest
}: AvatarProps & RMWC.ComponentProps) => {
  const initials = getInitialsForName(name);
  const avatarStyle = src
    ? {
        backgroundImage: `url(${src})`
      }
    : {};

  return (
    <AvatarRoot
      ripple={interactive}
      interactive={interactive}
      size={size}
      title={name}
      tag={'span'}
      {...rest}
      icon={{
        icon: (
          <React.Fragment>
            <div className="rmwc-avatar__icon" style={avatarStyle} />
            <div className="rmwc-avatar__text">
              <div className="rmwc-avatar__text-inner">{initials}</div>
            </div>
          </React.Fragment>
        )
      }}
    />
  );
};

Avatar.displayName = 'Avatar';

export interface AvatarCountProps {
  /** The number of users. */
  value: number;
  /** Optionally renders a "+" to indicate overlow. */
  overflow?: boolean;
  /** The size of the avatar */
  size?: RMWC.IconSizeT;
  /** Make the avatar square. */
  square?: boolean;
  /** Make the avatar interactive. */
  interactive?: boolean;
}

/** An Avatar count for displaying list overflow. */
export const AvatarCount = ({
  value,
  overflow,
  size,
  interactive = false,
  ...rest
}: AvatarCountProps & RMWC.ComponentProps) => {
  const smallerText = String(value).length > 2;
  return (
    <AvatarRoot
      {...rest}
      ripple={interactive}
      interactive={interactive}
      isCount
      size={size}
      overflow={overflow}
      smallerText={smallerText}
      tag={'span'}
      {...rest}
      icon={{
        icon: (
          <React.Fragment>
            <div className="rmwc-avatar__text">
              <div className="rmwc-avatar__text-inner">{value}</div>
            </div>
          </React.Fragment>
        )
      }}
    />
  );
};

AvatarCount.displayName = 'AvatarCount';
