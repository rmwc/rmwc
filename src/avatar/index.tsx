import * as React from 'react';
import * as RMWC from '@rmwc/types';
import { Icon, IconProps } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';
import { useClassNames, useTag } from '@rmwc/base';

/** An Avatar component for displaying users in a system. */
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
  /** Contain the avatar image instead of covering. */
  contain?: boolean;
}

const getInitialsForName = (name: string) => {
  if (name) {
    const parts = name.split(' ');
    /* istanbul ignore next */
    let letters = (parts[0] || '')[0];
    if (parts.length > 1) {
      const part = parts.pop();
      /* istanbul ignore next */
      if (part) {
        letters += part[0];
      }
    }
    return letters;
  }

  return '';
};

interface AvatarRootProps extends IconProps {
  isCount?: boolean;
  overflow?: boolean;
  smallerText?: boolean;
  square?: boolean;
  interactive?: boolean;
  hasImage?: boolean;
  size?: RMWC.IconSizeT;
}

const AvatarRoot = withRipple()(
  React.memo(
    React.forwardRef<any, AvatarRootProps & Omit<RMWC.ComponentProps, 'size'>>(
      function AvatarRoot(props, ref) {
        const {
          isCount,
          overflow,
          smallerText,
          square,
          interactive,
          hasImage,
          ...rest
        } = props;

        const className = useClassNames(props, [
          'rmwc-avatar',
          {
            [`rmwc-avatar--${props.size}`]: rest.size,
            'rmwc-avatar--count': isCount,
            'rmwc-avatar--interactive': interactive,
            'rmwc-avatar--count-overflow': overflow,
            'rmwc-avatar--smaller-text': smallerText,
            'rmwc-avatar--square': square,
            'rmwc-avatar--has-image': hasImage
          }
        ]);
        return <Icon {...rest} className={className} ref={ref} />;
      }
    )
  )
);

/** A container for groups of Avatars */
export interface AvatarGroupProps {
  /** Makes the list dense */
  dense?: boolean;
}

/** A container for groups of Avatars */
export const AvatarGroup = React.forwardRef<
  any,
  AvatarGroupProps & RMWC.ComponentProps
>(function AvatarGroup(props, ref) {
  const Tag = useTag(props);

  const { dense, ...rest } = props;

  const className = useClassNames(props, [
    'rmwc-avatar-group',
    {
      'rmwc-avatar-group--dense': dense
    }
  ]);

  return <Tag ref={ref} {...rest} className={className} />;
});
AvatarGroup.displayName = 'AvatarGroup';

/** An Avatar component for displaying users in a system. */
export const Avatar = React.forwardRef<
  any,
  AvatarProps & Omit<RMWC.ComponentProps, 'size'>
>(function Avatar(
  { src, size, name = '', interactive = false, contain = false, ...rest },
  ref
) {
  const initials = getInitialsForName(name);
  const avatarStyle = src
    ? {
        backgroundImage: `url(${src})`,
        backgroundSize: contain ? 'contain' : 'cover'
      }
    : {};

  return (
    <AvatarRoot
      ref={ref}
      ripple={interactive}
      interactive={interactive}
      hasImage={!!src}
      size={size}
      title={name}
      tag={'span'}
      {...rest}
      icon={{
        icon: (
          <>
            <div className="rmwc-avatar__icon" style={avatarStyle} />
            <div className="rmwc-avatar__text">
              <div className="rmwc-avatar__text-inner">{initials}</div>
            </div>
          </>
        )
      }}
    />
  );
});

Avatar.displayName = 'Avatar';

/** An Avatar count for displaying list overflow. */
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
export const AvatarCount = React.memo(
  React.forwardRef<any, AvatarCountProps & Omit<RMWC.ComponentProps, 'size'>>(
    function AvatarCount(
      { value, overflow, size, interactive = false, ...rest },
      ref
    ) {
      const smallerText = String(value).length > 2;
      return (
        <AvatarRoot
          ref={ref}
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
              <>
                <div className="rmwc-avatar__text">
                  <div className="rmwc-avatar__text-inner">{value}</div>
                </div>
              </>
            )
          }}
        />
      );
    }
  )
);

AvatarCount.displayName = 'AvatarCount';
